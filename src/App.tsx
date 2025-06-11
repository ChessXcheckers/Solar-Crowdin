import { BrowserRouter as Router } from 'react-router-dom';
import WalletKitProvider from './components/WalletKitProvider';
import { Toaster } from './components/Toaster';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Tokenomics } from './components/Tokenomics';
import { Roadmap } from './components/Roadmap';
import { Team } from './components/Team';
import { FAQ } from './components/FAQ';
import { Partners } from './components/Partners';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PresaleCard } from './components/PresaleCard';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Router>
        <WalletKitProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <Hero />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <PresaleCard />
              </div>
              <Tokenomics />
              <Roadmap />
              <Team />
              <FAQ />
              <Partners />
              <Contact />
            </main>
            <Footer />
          </div>
        </WalletKitProvider>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
