# Vibe Connect Virtual: Astro site

Static Astro 7 site (Tailwind 4). The only client JavaScript is a ~5 KB script
for the mobile menu and scroll animations. The application form (React) loads
only when someone clicks an Apply Now link or opens `/application-page`.

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

The form posts to `/api/apply`, a Cloudflare Pages Function
(`functions/api/apply.ts`) that creates/updates the contact in GHL and writes
the answers to the existing custom fields. Set these in Cloudflare Pages →
Settings → Variables and Secrets (Production):

| Variable | Value |
|---|---|
| `LOCATION_ID` | GHL sub-account (location) ID |
| `PRIVATE_INTEGRATION_KEY` | GHL Private Integration token (store as a Secret) |

The token needs the `contacts.write` scope (add `contacts.readonly` if you also
read contacts). The key stays on the server and is never sent to the browser.
If the function fails, the applicant sees an error with a link to the hosted
backup form (`GHL_FORM_URL` in `src/config/site.ts`), so no application is
silently lost. `astro dev` does not run the function; use
`npx wrangler pages dev dist` after a build to test it locally.

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
