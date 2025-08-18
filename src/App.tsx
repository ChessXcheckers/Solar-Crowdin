
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from './components/Toaster';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Tokenomics from "./pages/Tokenomics";
import Roadmap from "./pages/Roadmap";
import Team from "./pages/Team";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProductionErrorBoundary from './components/ProductionErrorBoundary';
import Navbar from './components/Navbar';
import BreakingNews from './components/BreakingNews';
import { analytics, measureWebVitals } from './utils/analytics';
import { setupCSP, performSecurityChecks } from './utils/security';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    },
  },
});

const App = () => {
  useEffect(() => {
    // Initialize production features
    analytics.init();
    measureWebVitals();
    setupCSP();
    performSecurityChecks();

    // Track initial page view
    analytics.page(window.location.pathname);
  }, []);

  return (
    <ProductionErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <Router>
                <div className="min-h-screen">
                  <Navbar />
                  <BreakingNews />
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/tokenomics" element={<Tokenomics />} />
                  <Route path="/roadmap" element={<Roadmap />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                </div>
            </Router>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ProductionErrorBoundary>
  );
};

export default App;
