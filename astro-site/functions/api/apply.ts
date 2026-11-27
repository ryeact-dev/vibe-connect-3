/**
 * Cloudflare Pages Function: POST /api/apply
 *
 * Receives the application form and creates/updates the contact in
 * GoHighLevel (LeadConnector API v2) with the answers as custom fields.
 *
 * Environment variables (Cloudflare Pages → Settings → Variables and Secrets):
 *   LOCATION_ID              GHL sub-account (location) ID
 *   PRIVATE_INTEGRATION_KEY  GHL Private Integration token (never sent to the browser)
 * The token needs these scopes: contacts.write, contacts.readonly and locations/customFields.readonly.
 *
 * SMS consent is also written to contact custom fields so emails and workflows can use merge fields.
 * Create these contact custom fields in GHL (type: Single Line text); the function finds them by key and
 * simply skips any that do not exist yet:
 *   sms_consent_job_hiring_newsletter   {{contact.sms_consent_job_hiring_newsletter}}   Yes / No
 *   sms_consent_marketing_promotional   {{contact.sms_consent_marketing_promotional}}   Yes / No
 *   sms_consent_date                    {{contact.sms_consent_date}}                    UTC date and time of the submission
 */

interface Env {
  LOCATION_ID?: string;
  PRIVATE_INTEGRATION_KEY?: string;
}

type Ctx = { request: Request; env: Env };

const GHL = "https://services.leadconnectorhq.com";

/** GHL custom field IDs (same fields the previous form wrote to). */
const FIELD = {
  q1Contractor: "kaesBf5bgOLPmByMc0Hq", // 1099 Contractor Comfort
  q2Equipment: "urlN2j8VUdONnMjhjdUI", // Equipment Readiness
  notes: "XZqU88nxO6H4s7JMAaIX", // Optional notes (was "Headset Brand Specification")
  q3StartPromptly: "QUgI5V30qLKtxCUexEwp", // Ability to Act Promptly
  q4ApprovedState: "iY8Yif0jW6cLQbRQI36D", // Residing in Approved State
  q5OnboardingSteps: "kLdFVxqqWvPdajTgHsr9", // Unpaid Onboarding Willingness
} as const;

/** Optional custom fields (created in GHL by hand), looked up by field key and cached for a few minutes. */
const OPTIONAL_KEYS = [
  "sms_consent_job_hiring_newsletter",
  "sms_consent_marketing_promotional",
  "sms_consent_date",
] as const;
type OptionalKey = (typeof OPTIONAL_KEYS)[number];

let fieldCache: { at: number; ids: Partial<Record<OptionalKey, string>> } | null = null;

async function optionalFieldIds(env: Env, headers: Record<string, string>) {
  if (fieldCache && Date.now() - fieldCache.at < 10 * 60_000) return fieldCache.ids;
  const ids: Partial<Record<OptionalKey, string>> = {};
  try {
    const r = await fetch(`${GHL}/locations/${env.LOCATION_ID}/customFields?model=contact`, { headers });
    if (!r.ok) {
      console.warn("apply: could not read custom field definitions, status", r.status);
      return ids; // not cached, so the next request tries again
    }
    const out = (await r.json()) as { customFields?: { id?: string; fieldKey?: string; name?: string }[] };
    // GHL builds the field key from the field name, so match on the exact key first and then on the
    // key or name wording (e.g. "SMS Consent - Job Hiring and Newsletter" -> sms_consent_job_hiring_and_newsletter).
    const norm = (v: string) => v.toLowerCase().replace(/^contact\./, "").replace(/[^a-z0-9]/g, "");
    const rules: Record<OptionalKey, string[]> = {
      sms_consent_job_hiring_newsletter: ["smsconsent", "hiring"],
      sms_consent_marketing_promotional: ["smsconsent", "marketing"],
      sms_consent_date: ["smsconsent", "date"],
    };
    for (const f of out.customFields ?? []) {
      if (!f.id) continue;
      const hay = [norm(f.fieldKey ?? ""), norm(f.name ?? "")];
      for (const k of OPTIONAL_KEYS) {
        if (ids[k]) continue;
        const exact = (f.fieldKey ?? "").replace(/^contact\./, "").toLowerCase() === k;
        if (exact || hay.some((h) => rules[k].every((w) => h.includes(w)))) ids[k] = f.id;
      }
    }
    const missing = OPTIONAL_KEYS.filter((k) => !ids[k]);
    console.log(`apply: custom fields found=${Object.keys(ids).length} missing=[${missing.join(",")}]`);
    fieldCache = { at: Date.now(), ids };
  } catch {
    console.warn("apply: custom field lookup failed");
  }
  return ids;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const yesNo = (v: unknown) => (v === "Yes" || v === "No" ? v : "");

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  // Same-origin only: blocks other sites from posting to this endpoint.
  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ ok: false, error: "forbidden" }, 403);
  }
  if (!env.LOCATION_ID || !env.PRIVATE_INTEGRATION_KEY) {
    console.error("apply: LOCATION_ID or PRIVATE_INTEGRATION_KEY is not configured");
    return json({ ok: false, error: "not_configured" }, 500);
  }

  let data: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 20_000) return json({ ok: false, error: "too_large" }, 413);
    data = JSON.parse(text);
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Bots: honeypot filled or form submitted impossibly fast. Pretend success.
  if (str(data.website)) {
    console.warn("apply: dropped (honeypot field was filled)");
    return json({ ok: true });
  }
  const startedAt = Number(data.startedAt);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 2500) {
    console.warn("apply: rejected (submitted too fast)");
    return json({ ok: false, error: "too_fast" }, 429);
  }

  const fullName = str(data.fullName, 120);
  const email = str(data.email, 200).toLowerCase();
  const digits = str(data.phone, 40).replace(/\D/g, "");
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  if (!fullName || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email) || national.length !== 10 || national[0] < "2" || national[3] < "2") {
    console.warn("apply: rejected (invalid name/email/phone)");
    return json({ ok: false, error: "invalid" }, 400);
  }
  const answers = {
    q1Contractor: yesNo(data.q1Contractor),
    q2Equipment: yesNo(data.q2Equipment),
    q3StartPromptly: yesNo(data.q3StartPromptly),
    q4ApprovedState: yesNo(data.q4ApprovedState),
    q5OnboardingSteps: yesNo(data.q5OnboardingSteps),
  };
  if (Object.values(answers).some((v) => !v)) return json({ ok: false, error: "invalid" }, 400);

  const [firstName, ...rest] = fullName.split(/\s+/);
  const notes = str(data.notes, 1000);
  const consentNon = data.tcpaConsent1 === true;
  const consentMkt = data.tcpaConsent2 === true;

  const tags = ["website application", ...(consentNon ? ["sms consent: hiring/newsletter"] : []), ...(consentMkt ? ["sms consent: marketing"] : [])];
  const consentAt = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
  const pageUrl = str(data.pageUrl, 300);
  const headers = {
    Authorization: `Bearer ${env.PRIVATE_INTEGRATION_KEY}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const extra = await optionalFieldIds(env, headers);
  const customFields = [
    { id: FIELD.q1Contractor, field_value: answers.q1Contractor },
    { id: FIELD.q2Equipment, field_value: answers.q2Equipment },
    { id: FIELD.q3StartPromptly, field_value: answers.q3StartPromptly },
    { id: FIELD.q4ApprovedState, field_value: answers.q4ApprovedState },
    { id: FIELD.q5OnboardingSteps, field_value: answers.q5OnboardingSteps },
    ...(notes ? [{ id: FIELD.notes, field_value: notes }] : []),
    // SMS consent records ("No" is stored too, so every application has a recorded choice)
    ...(extra.sms_consent_job_hiring_newsletter ? [{ id: extra.sms_consent_job_hiring_newsletter, field_value: consentNon ? "Yes" : "No" }] : []),
    ...(extra.sms_consent_marketing_promotional ? [{ id: extra.sms_consent_marketing_promotional, field_value: consentMkt ? "Yes" : "No" }] : []),
    ...(extra.sms_consent_date ? [{ id: extra.sms_consent_date, field_value: consentAt }] : []),
  ];

  const res = await fetch(`${GHL}/contacts/upsert`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      locationId: env.LOCATION_ID,
      firstName,
      lastName: rest.join(" "),
      name: fullName,
      email,
      phone: `+1${national}`,
      source: "Website application form",
      tags,
      customFields,
    }),
  });

  if (!res.ok) {
    // Never log the key or the applicant's data; the status and GHL's message are enough to debug.
    console.error("apply: GHL upsert failed", res.status, (await res.text()).slice(0, 300));
    return json({ ok: false, error: "upstream" }, 502);
  }

  let id: string | undefined;
  try {
    const out = (await res.json()) as { new?: boolean; contact?: { id?: string } };
    id = out.contact?.id;
    // No personal data in logs: only whether a contact was created or updated, its GHL id,
    // and the last 4 characters of the location id to confirm which sub-account was used.
    console.log(`apply: GHL upsert ok status=${res.status} new=${String(out.new)} contactId=${id ?? "none"} location=...${env.LOCATION_ID.slice(-4)}`);
  } catch {
    console.warn(`apply: GHL upsert returned ${res.status} but the response could not be read`);
  }

  // Best effort: keep the full application (answers, notes and SMS consent) on the contact's timeline.
  if (id) {
    try {
      const body = [
        "Website application received.",
        `Page: ${pageUrl || "unknown"}`,
        `Received: ${consentAt}`,
        "",
        "Answers:",
        `1. 1099 independent contractor arrangement understood and agreed: ${answers.q1Contractor}`,
        `2. Windows computer, quiet workspace, wired internet, USB wired headset and working webcam: ${answers.q2Equipment}`,
        `3. Able to act promptly when opportunities open: ${answers.q3StartPromptly}`,
        `4. Resides in an approved state: ${answers.q4ApprovedState}`,
        `5. Willing to complete the unpaid initial registration steps (profile setup, Arise assessment, $30 background check) before paid certification training: ${answers.q5OnboardingSteps}`,
        ...(notes ? ["", `Applicant notes: ${notes}`] : []),
        "",
        "SMS consent:",
        `- Job hiring and newsletter (non-marketing): ${consentNon ? "Yes" : "No"}`,
        `- Marketing and promotional: ${consentMkt ? "Yes" : "No"}`,
      ].join("\n");
      const n = await fetch(`${GHL}/contacts/${id}/notes`, { method: "POST", headers, body: JSON.stringify({ body }) });
      if (!n.ok) console.warn("apply: note not saved, status", n.status);
    } catch {
      /* the contact is already saved; the note is optional */
    }
  }

  return json({ ok: true });
};

// Anything other than POST
export const onRequest = (): Response => json({ ok: false, error: "method_not_allowed" }, 405);
