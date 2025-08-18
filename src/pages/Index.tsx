
import React, { Suspense, lazy } from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import ErrorBoundary from '@/components/ErrorBoundary';
import GoogleAIBot from '@/components/GoogleAIBot';

import PresalePopup from '@/components/PresalePopup';

// Lazy load components with proper error handling
const AboutSection = lazy(() => import('@/components/AboutSection'));
const PresaleMain = lazy(() => import('@/components/PresaleMain'));
const UserBalance = lazy(() => import('@/components/UserBalance'));
const TopHolders = lazy(() => import('@/components/TopHolders'));
const TokenDetails = lazy(() => import('@/components/TokenDetails'));
const UtilityBenefits = lazy(() => import('@/components/UtilityBenefits'));
const HowToBuy = lazy(() => import('@/components/HowToBuy'));

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
    <div className="min-h-screen bg-solar-navy relative">
      {/* Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' stroke-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-16-16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3Cpath d='M14 14l2-2m4 2l-2-2m2 2l2 2m-2 2l2 2m-2-2l-2 2'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Main Content - Add proper top padding to account for fixed navbar */}
      <div className="pt-28 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {/* Countdown Timer */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-solar-warm-white mb-2 drop-shadow-md">
              Join the <span className="nebulae-text">AI Solar Revolution</span>
            </h1>
            <p className="text-solar-grey mb-8 font-medium drop-shadow-sm">Presale ends in:</p>
            <CountdownTimer />
          </div>

          {/* Main Presale Section */}
          <div id="presale-section">
            <LazySection>
              <PresaleMain />
            </LazySection>
          </div>

          {/* About Section */}
          <LazySection>
            <AboutSection />
          </LazySection>

          {/* User Balance */}
          <LazySection>
            <UserBalance />
          </LazySection>

          {/* Top Holders Rewards */}
          <LazySection>
            <TopHolders />
          </LazySection>

          {/* Token Details */}
          <LazySection>
            <TokenDetails />
          </LazySection>

          {/* Utility & Benefits */}
          <LazySection>
            <UtilityBenefits />
          </LazySection>

          {/* How to Buy */}
          <LazySection>
            <HowToBuy />
          </LazySection>
        </div>
      </div>

      {/* Pop-up Modal */}
      <PresalePopup />

      {/* AI Chat Bot */}
      <GoogleAIBot />

      {/* Footer */}
      <footer className="bg-gray-800/95 backdrop-blur-sm text-white py-8 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 SolarCrowdin AI. All rights reserved.</p>
          <p className="text-xs text-gray-400 mt-2">
            SLC Token Presale - Join the Solar Revolution
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
