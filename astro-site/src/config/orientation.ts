/**
 * Orientation materials shown on the thank-you page.
 *
 * Video (pick one):
 *  - Put an MP4 at public/videos/orientation.mp4 (optional poster: public/videos/orientation-poster.jpg), or
 *  - Set ORIENTATION_VIDEO_EMBED_URL to a YouTube / Vimeo / Cloudflare Stream embed URL.
 *  Cloudflare Pages rejects files over 25 MB, so a larger video must be hosted elsewhere and embedded.
 * PDF: put it at public/downloads/vibe-connect-orientation.pdf.
 * Until a file exists, the page shows a "coming soon" placeholder instead of a broken player or link.
 */
export const ORIENTATION_VIDEO_FILE = "/videos/orientation.mp4";
export const ORIENTATION_VIDEO_POSTER = "/videos/orientation-poster.jpg";
export const ORIENTATION_VIDEO_EMBED_URL = ""; // e.g. "https://www.youtube.com/embed/VIDEO_ID"
export const ORIENTATION_PDF_FILE = "/downloads/vibe-connect-orientation.pdf";
export const ORIENTATION_PDF_LABEL = "Download the orientation PDF";
