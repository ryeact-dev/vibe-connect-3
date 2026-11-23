/**
 * Orientation materials shown on the thank-you page.
 *
 * Video (the first one that is set wins):
 *  1. ORIENTATION_VIDEO_EMBED_URL: a YouTube / Vimeo / Cloudflare Stream embed URL.
 *  2. ORIENTATION_VIDEO_URL: a direct link to an MP4, e.g. a file in the GoHighLevel Media Library
 *     (Media > open the file > copy link). Plays in the page with the browser's own controls.
 *  3. An MP4 at public/videos/orientation.mp4 (optional poster: public/videos/orientation-poster.jpg).
 *  Cloudflare Pages rejects files over 25 MB, so a larger video should use option 1 or 2.
 * PDF: set ORIENTATION_PDF_URL (a direct link, e.g. from the GHL Media Library) or put the file at
 *  public/downloads/vibe-connect-orientation.pdf.
 * Until a file exists, the page shows a "coming soon" placeholder instead of a broken player or link.
 */
export const ORIENTATION_VIDEO_FILE = "/videos/orientation.mp4";
export const ORIENTATION_VIDEO_POSTER = "/videos/orientation-poster.jpg";
export const ORIENTATION_VIDEO_EMBED_URL = ""; // e.g. "https://www.youtube.com/embed/VIDEO_ID"
export const ORIENTATION_VIDEO_URL = ""; // e.g. "https://assets.cdn.filesafe.space/.../orientation.mp4"
export const ORIENTATION_PDF_FILE = "/downloads/vibe-connect-orientation.pdf";
export const ORIENTATION_PDF_LABEL = "Download the orientation PDF";
export const ORIENTATION_PDF_URL = ""; // e.g. "https://assets.cdn.filesafe.space/.../orientation.pdf"
