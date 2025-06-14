
import { BrowserRouter as Router } from 'react-router-dom';
import WalletKitProvider from './components/WalletKitProvider';
import { Toaster } from './components/Toaster';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Tokenomics from "./pages/Tokenomics";
import BrandGuidePage from "./pages/BrandGuidePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Router basename="/">
        <WalletKitProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/tokenomics" element={<Tokenomics />} />
            <Route path="/brand-guide" element={<BrandGuidePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WalletKitProvider>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
