
import React, { Suspense, lazy } from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load components with proper error handling
const PresaleMain = lazy(() => import('@/components/PresaleMain'));
const UserBalance = lazy(() => import('@/components/UserBalance'));
const VIPStatus = lazy(() => import('@/components/VIPStatus'));
const TopHolders = lazy(() => import('@/components/TopHolders'));
const TokenDetails = lazy(() => import('@/components/TokenDetails'));
const UtilityBenefits = lazy(() => import('@/components/UtilityBenefits'));
const HowToBuy = lazy(() => import('@/components/HowToBuy'));
const AICheatBot = lazy(() => import('@/components/AICheatBot'));

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
  </div>
);

const LazySection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary>
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

const Index: React.FC = () => {
  console.log('Index page rendering...');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-slate-900/30 to-orange-900/20 relative backdrop-blur-sm">
      {/* Enhanced Background with Glassmorphic Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-orange-500/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ff6b35' stroke-width='1' stroke-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-16-16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3Cpath d='M14 14l2-2m4 2l-2-2m2 2l2 2m-2 2l2 2m-2-2l-2 2'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      {/* Header - Logo Only */}
      <header className="bg-white/10 backdrop-blur-md shadow-2xl border-b border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/dfd85afc-5560-4a65-9550-9643be9ce3d3.png" 
              alt="SolarCrowdin Logo" 
              className="h-16 w-auto drop-shadow-2xl"
            />
          </div>
          <div className="text-sm text-white/90 font-medium backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full border border-white/20">
            © 2025 SolarCrowdin AI
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Enhanced Countdown Timer Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            Join the <span className="text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text">AI Solar Revolution</span>
          </h1>
          <p className="text-white/90 mb-8 font-medium text-xl drop-shadow-lg backdrop-blur-sm bg-white/5 inline-block px-6 py-2 rounded-full border border-white/20">
            Presale ends in:
          </p>
          <CountdownTimer />
        </div>

        {/* Enhanced Glassmorphic Sections */}
        <LazySection>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-1">
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl">
              <PresaleMain />
            </div>
          </div>
        </LazySection>

        <LazySection>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-1">
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl">
              <UserBalance />
            </div>
          </div>
        </LazySection>

        <LazySection>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-1">
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl">
              <VIPStatus />
            </div>
          </div>
        </LazySection>

        <LazySection>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-1">
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl">
              <TopHolders />
            </div>
          </div>
        </LazySection>

        <LazySection>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-1">
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl">
              <TokenDetails />
            </div>
          </div>
        </LazySection>

        <LazySection>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-1">
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl">
              <UtilityBenefits />
            </div>
          </div>
        </LazySection>

        <LazySection>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-1">
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl">
              <HowToBuy />
            </div>
          </div>
        </LazySection>
      </div>

      {/* AI Chat Bot */}
      <LazySection>
        <AICheatBot />
      </LazySection>

      {/* Enhanced Footer */}
      <footer className="bg-black/40 backdrop-blur-md text-white py-8 mt-16 relative z-10 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium">© 2025 SolarCrowdin AI. All rights reserved.</p>
          <p className="text-xs text-white/70 mt-2">
            SLC Token Presale - Join the Solar Revolution
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
