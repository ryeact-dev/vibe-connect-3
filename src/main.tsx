import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;
// Drop the build-time prerendered SEO markup (see vite-plugins/seo-prerender.ts)
// and un-hide the root before React takes over.
container.removeAttribute("data-prerendered");
container.innerHTML = "";

createRoot(container).render(<App />);
