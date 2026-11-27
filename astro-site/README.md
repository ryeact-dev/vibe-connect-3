# Vibe Connect Virtual: Astro site

Static Astro 7 site (Tailwind 4). The only client JavaScript is a ~5 KB script
for the mobile menu and scroll animations. The application form (React) loads
only when someone clicks an Apply Now link (the application form is a pop-up; there is no separate form page).

## Commands

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs ./dist
npm run preview
npm run check      # type check
```

## Deploying to a new domain

1. The site URL defaults to `https://vibe-connect-3.pages.dev`. Build with the new
   origin so canonicals, JSON-LD, the sitemap, `robots.txt` and `llms.txt` use it:

   ```bash
   PUBLIC_SITE_URL=https://www.your-domain.com npm run build
   ```

   On Cloudflare Pages / Netlify / Vercel, set `PUBLIC_SITE_URL` as a build
   environment variable (build command `npm run build`, output `dist`).
2. `robots.txt` is generated at build, so its `Sitemap:` line follows the same variable.
3. The build writes clean URLs as files (`/terms` is `dist/terms.html`). Cloudflare
   Pages, Netlify, Vercel and GitHub Pages serve these without extra setup.
   nginx/S3 need `try_files $uri $uri.html =404`.
4. Submit `https://your-domain/sitemap-index.xml` in Google Search Console and
   Bing Webmaster Tools.

## GoHighLevel form submission

The form posts to `/api/apply`, a Cloudflare Pages Function (`functions/api/apply.ts`) that creates/updates
the contact in GHL, writes the answers to custom fields, adds a Note with the full application, and records
the SMS consent. Set these in Cloudflare Pages, Settings, Variables and Secrets (Production):

| Variable | Value |
|---|---|
| `LOCATION_ID` | GHL sub-account (location) ID |
| `PRIVATE_INTEGRATION_KEY` | GHL Private Integration token (store as a Secret) |

Token scopes: `contacts.write`, `contacts.readonly` and `locations/customFields.readonly`. The key stays on
the server. If the function fails, the applicant sees an error with a link to the hosted backup form
(`GHL_FORM_URL`), so no application is silently lost. `astro dev` does not run the function; use
`npx wrangler pages dev dist` after a build to test it locally.

### Custom fields (use them as merge fields in emails and workflows)

The five answers go to existing fields (`1099_contractor_comfort`, `equipment_readiness`,
`ability_to_act_promptly`, `residing_in_approved_state`, `unpaid_onboarding_willingness`). The SMS consent
is stored in these **contact custom fields, which you create once in GHL** (Settings, Custom Fields, type
"Single Line"). The function finds them by key and skips any that do not exist yet:

| Field name | Key (merge field) | Value |
|---|---|---|
| SMS Consent - Job Hiring and Newsletter | `sms_consent_job_hiring_newsletter` | Yes or No |
| SMS Consent - Marketing and Promotional | `sms_consent_marketing_promotional` | Yes or No |
| SMS Consent Date | `sms_consent_date` | UTC date and time of the submission |
| SMS Consent Page | `sms_consent_page` | page the form was submitted from |
| Applicant Notes (optional) | `applicant_notes` | the optional notes box |

The Cloudflare real-time log shows `apply: custom fields found=N missing=[...]` so you can see which keys
still need to be created. The same data is always in the contact's Note, in case a field is missing.

### "New Applicant" email template

```
New Applicant

Full Legal Name: {{contact.name}}
Email: {{contact.email}}
Contact Number: {{contact.phone}}

New Application Form Response:

Q1: Please read carefully: This is a 1099 Independent Contractor position, NOT a W-2 employee role. This means you will be operating as your own business. You are responsible for your own taxes (no automatic withholding), you will not receive employee benefits, and you control how you run your work as an independent contractor. Do you understand and agree to this arrangement?
A: {{contact.1099_contractor_comfort}}

Q2: Do you have a Windows computer, a quiet and distraction-free workspace, stable wired internet connection, a USB wired headset, and a working webcam?
A: {{contact.equipment_readiness}}

Q3: Since Arise programs open and close quickly, are you able to act promptly when opportunities become available?
A: {{contact.ability_to_act_promptly}}

Q4: Are you currently residing in one of the approved states (Alabama, Arizona, Arkansas, Delaware, Florida, Georgia, Kentucky, Louisiana, Michigan, Mississippi, Missouri, Nevada, North Carolina, Ohio, Oklahoma, South Carolina, Texas, Washington)?
A: {{contact.residing_in_approved_state}}

Q5: Are you willing to complete the unpaid initial registration steps (profile setup, Arise assessment, and $30 background check) before starting paid certification training and client production?
A: {{contact.unpaid_onboarding_willingness}}

Notes from the applicant: {{contact.applicant_notes}}

SMS consent:
Job Hiring and Newsletter (non-marketing): {{contact.sms_consent_job_hiring_newsletter}}
Marketing and Promotional: {{contact.sms_consent_marketing_promotional}}
Consent recorded: {{contact.sms_consent_date}}
Consent page: {{contact.sms_consent_page}}
```

If a merge field shows blank, check the field's exact key in GHL (Settings, Custom Fields) and that the
workflow runs after the contact is saved.

## Thank-you and orientation pages

After a successful submission the form redirects to `/thank-you`, which confirms the application and sends
the applicant to `/orientation` with one large button. `/orientation` holds the orientation video and the
downloadable orientation PDF. Both pages are `noindex` and are not in the sitemap.

The video and PDF links live in `src/config/orientation.ts`:

- `ORIENTATION_VIDEO_URL`: direct MP4 link (currently a file in the GHL Media Library).
- `ORIENTATION_PDF_URL`: direct PDF link (currently a file in the GHL Media Library).
- Alternatives: `ORIENTATION_VIDEO_EMBED_URL` (YouTube / Vimeo / Cloudflare Stream embed), or files in
  `public/videos/orientation.mp4` and `public/downloads/vibe-connect-orientation.pdf` (Cloudflare Pages
  rejects files over 25 MB). If nothing is set, the page shows a "coming soon" placeholder.

To replace the video or PDF, upload the new file to GHL, copy its direct link and paste it into the config.
The GHL file must stay public, and the video should be MP4 (H.264).

## Where things are

| What | Where |
|---|---|
| Business facts (pay, states, contact, last updated) | `src/config/site.ts` |
| Hub + role page copy, FAQ, JSON-LD builder | `src/data/seo-pages.ts` |
| Homepage copy, FAQ, roles | `src/data/home-copy.ts`, `faq-data.ts`, `roles-data.ts` |
| Privacy Policy / Terms (drafts, get legal review) | `src/data/legal-pages.ts` |
| Banners (1600x600 WebP) | `src/assets/banners` (page) and `public/images` (og:image) |
| Application form (UI) | `src/react/ApplicationForm.tsx` |
| Form to GHL (server side) | `functions/api/apply.ts` |
| AI crawler summary | `src/pages/llms.txt.ts` |

When pay changes, update `PAY_RATE`, `LAST_UPDATED_*` in `src/config/site.ts`
and the Quick answer / pay paragraphs in `src/data/seo-pages.ts`.

## Notes

- Hero/about/logo photos are still loaded from the old platform's CDN
  (`src/data/images.ts`, `ORG_LOGO_URL`). Download them into `src/assets` and
  use `<Image>` to self-host before leaving that platform.
