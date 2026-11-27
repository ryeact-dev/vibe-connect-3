// Sends the default *.pages.dev address to the real domain.
// Only the exact production hostname is redirected: preview deployments
// (<hash>.vibe-connect-3.pages.dev) and the custom domain pass through.
// Cloudflare Redirect Rules can't do this because pages.dev is not in our zone.
const PAGES_HOST = "vibe-connect-3.pages.dev";
const TARGET_ORIGIN = "https://vibeconnectvs.com";

type Ctx = { request: Request; next: () => Promise<Response> };

export const onRequest = async (context: Ctx): Promise<Response> => {
  const url = new URL(context.request.url);

  if (url.hostname === PAGES_HOST) {
    // 302 while testing; change to 301 once the domain is confirmed stable.
    return Response.redirect(`${TARGET_ORIGIN}${url.pathname}${url.search}`, 302);
  }

  return context.next();
};
