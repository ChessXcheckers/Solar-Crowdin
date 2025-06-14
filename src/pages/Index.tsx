
import { Suspense, lazy } from 'react';
import CountdownTimer from '@/components/CountdownTimer';

// Lazy load components to help with any potential loading issues
const PresaleMain = lazy(() => import('@/components/PresaleMain'));
const UserBalance = lazy(() => import('@/components/UserBalance'));
const VIPStatus = lazy(() => import('@/components/VIPStatus'));
const TopHolders = lazy(() => import('@/components/TopHolders'));
const TokenDetails = lazy(() => import('@/components/TokenDetails'));
const UtilityBenefits = lazy(() => import('@/components/UtilityBenefits'));
const HowToBuy = lazy(() => import('@/components/HowToBuy'));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative">
      {/* Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6b35' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            <span className="text-orange-600">Solar</span> Crowding
          </div>
          <div className="text-sm text-gray-800 font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
            © 2025 Solar Crowding AI
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Countdown Timer */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              Join the <span className="text-orange-600">AI Solar Revolution</span>
            </h1>
            <p className="text-gray-900 mb-8 font-semibold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Presale ends in:</p>
            <CountdownTimer />
          </div>
        </div>

        {/* Main Presale Section */}
        <Suspense fallback={<LoadingSpinner />}>
          <PresaleMain />
        </Suspense>

        {/* User Balance */}
        <Suspense fallback={<LoadingSpinner />}>
          <UserBalance />
        </Suspense>

        {/* VIP Status */}
        <Suspense fallback={<LoadingSpinner />}>
          <VIPStatus />
        </Suspense>

        {/* Top Holders Rewards */}
        <Suspense fallback={<LoadingSpinner />}>
          <TopHolders />
        </Suspense>

        {/* Token Details */}
        <Suspense fallback={<LoadingSpinner />}>
          <TokenDetails />
        </Suspense>

        {/* Utility & Benefits */}
        <Suspense fallback={<LoadingSpinner />}>
          <UtilityBenefits />
        </Suspense>

        {/* How to Buy */}
        <Suspense fallback={<LoadingSpinner />}>
          <HowToBuy />
        </Suspense>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800/95 backdrop-blur-sm text-white py-8 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 Solar Crowding AI. All rights reserved.</p>
          <p className="text-xs text-gray-400 mt-2">
            Demo presale page - For demonstration purposes only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
