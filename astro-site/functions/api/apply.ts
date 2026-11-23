/**
 * Cloudflare Pages Function: POST /api/apply
 *
 * Receives the application form and creates/updates the contact in
 * GoHighLevel (LeadConnector API v2) with the answers as custom fields.
 *
 * Environment variables (Cloudflare Pages → Settings → Variables and Secrets):
 *   LOCATION_ID              GHL sub-account (location) ID
 *   PRIVATE_INTEGRATION_KEY  GHL Private Integration token (never sent to the browser)
 * The token needs these scopes: contacts.write (and contacts.readonly).
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
  const customFields = [
    { id: FIELD.q1Contractor, field_value: answers.q1Contractor },
    { id: FIELD.q2Equipment, field_value: answers.q2Equipment },
    { id: FIELD.q3StartPromptly, field_value: answers.q3StartPromptly },
    { id: FIELD.q4ApprovedState, field_value: answers.q4ApprovedState },
    { id: FIELD.q5OnboardingSteps, field_value: answers.q5OnboardingSteps },
    ...(notes ? [{ id: FIELD.notes, field_value: notes }] : []),
  ];

  const headers = {
    Authorization: `Bearer ${env.PRIVATE_INTEGRATION_KEY}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
    Accept: "application/json",
  };

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

  // Best effort: keep the consent wording and page on the contact's timeline.
  if (id) {
    try {
      const body = [
        "Website application received.",
        `Page: ${str(data.pageUrl, 300) || "unknown"}`,
        `SMS consent (hiring/newsletter, non-marketing): ${consentNon ? "Yes" : "No"}`,
        `SMS consent (marketing/promotional): ${consentMkt ? "Yes" : "No"}`,
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
