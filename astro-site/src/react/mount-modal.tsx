import { createRoot, type Root } from "react-dom/client";
import { ApplyModal } from "./ApplyModal";

let host: HTMLDivElement | null = null;
let root: Root | null = null;

function close() {
  root?.unmount();
  host?.remove();
  root = null;
  host = null;
}

/** Opens the application pop-up (loaded on demand from Base.astro). */
export function openApplyModal() {
  if (host) return;
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
  root.render(<ApplyModal onClose={close} />);
}
