import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ApplicationPage from "./pages/ApplicationPage";
import NotFound from "./pages/NotFound";
import { SeoPage } from "./components/SeoPage";
import { LegalPage } from "./components/LegalPage";
import { SEO_PAGES } from "./lib/seo-pages";
import { LEGAL_PAGES } from "./lib/legal-pages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/application-page" element={<ApplicationPage />} />
          {SEO_PAGES.map((p) => (
            <Route key={p.path} path={p.path} element={<SeoPage page={p} />} />
          ))}
          {LEGAL_PAGES.map((p) => (
            <Route key={p.path} path={p.path} element={<LegalPage page={p} />} />
          ))}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
