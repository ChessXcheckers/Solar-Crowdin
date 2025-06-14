import { Suspense, lazy } from 'react';
import CountdownTimer from '@/components/CountdownTimer';
import ErrorBoundary from '@/components/ErrorBoundary';

// Lazy load components with error boundaries
const PresaleMain = lazy(() => import('@/components/PresaleMain').catch(err => {
  console.error('Failed to load PresaleMain:', err);
  return { default: () => <div className="p-4 text-red-600">Failed to load presale component</div> };
}));

const UserBalance = lazy(() => import('@/components/UserBalance').catch(err => {
  console.error('Failed to load UserBalance:', err);
  return { default: () => <div className="p-4 text-gray-600">Balance unavailable</div> };
}));

const VIPStatus = lazy(() => import('@/components/VIPStatus').catch(err => {
  console.error('Failed to load VIPStatus:', err);
  return { default: () => <div className="p-4 text-gray-600">VIP status unavailable</div> };
}));

const TopHolders = lazy(() => import('@/components/TopHolders').catch(err => {
  console.error('Failed to load TopHolders:', err);
  return { default: () => <div className="p-4 text-gray-600">Top holders unavailable</div> };
}));

const TokenDetails = lazy(() => import('@/components/TokenDetails').catch(err => {
  console.error('Failed to load TokenDetails:', err);
  return { default: () => <div className="p-4 text-gray-600">Token details unavailable</div> };
}));

const UtilityBenefits = lazy(() => import('@/components/UtilityBenefits').catch(err => {
  console.error('Failed to load UtilityBenefits:', err);
  return { default: () => <div className="p-4 text-gray-600">Utility benefits unavailable</div> };
}));

const HowToBuy = lazy(() => import('@/components/HowToBuy').catch(err => {
  console.error('Failed to load HowToBuy:', err);
  return { default: () => <div className="p-4 text-gray-600">How to buy guide unavailable</div> };
}));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
  </div>
);

const ComponentErrorBoundary = ({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) => {
  return (
    <ErrorBoundary fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
};

const Index = () => {
  console.log('Index page rendering...');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 relative">
      {/* Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ff6b35' stroke-width='1' stroke-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-16-16v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3Cpath d='M14 14l2-2m4 2l-2-2m2 2l2 2m-2 2l2 2m-2-2l-2 2'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900 drop-shadow-sm">
            <span className="text-orange-600">Solar</span> Crowding
          </div>
          <div className="text-sm text-gray-700 drop-shadow-sm">
            © 2025 Solar Crowding AI
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Countdown Timer */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 drop-shadow-md">
            Join the <span className="text-orange-600">AI Solar Revolution</span>
          </h1>
          <p className="text-gray-800 mb-8 font-medium drop-shadow-sm">Presale ends in:</p>
          <CountdownTimer />
        </div>

        {/* Main Presale Section */}
        <ComponentErrorBoundary fallback={<div className="p-4 text-red-600">Presale section failed to load</div>}>
          <Suspense fallback={<LoadingSpinner />}>
            <PresaleMain />
          </Suspense>
        </ComponentErrorBoundary>

        {/* User Balance */}
        <ComponentErrorBoundary fallback={<div className="p-4 text-gray-600">Balance section unavailable</div>}>
          <Suspense fallback={<LoadingSpinner />}>
            <UserBalance />
          </Suspense>
        </ComponentErrorBoundary>

        {/* VIP Status */}
        <ComponentErrorBoundary fallback={<div className="p-4 text-gray-600">VIP section unavailable</div>}>
          <Suspense fallback={<LoadingSpinner />}>
            <VIPStatus />
          </Suspense>
        </ComponentErrorBoundary>

        {/* Top Holders Rewards */}
        <ComponentErrorBoundary fallback={<div className="p-4 text-gray-600">Top holders section unavailable</div>}>
          <Suspense fallback={<LoadingSpinner />}>
            <TopHolders />
          </Suspense>
        </ComponentErrorBoundary>

        {/* Token Details */}
        <ComponentErrorBoundary fallback={<div className="p-4 text-gray-600">Token details section unavailable</div>}>
          <Suspense fallback={<LoadingSpinner />}>
            <TokenDetails />
          </Suspense>
        </ComponentErrorBoundary>

        {/* Utility & Benefits */}
        <ComponentErrorBoundary fallback={<div className="p-4 text-gray-600">Utility section unavailable</div>}>
          <Suspense fallback={<LoadingSpinner />}>
            <UtilityBenefits />
          </Suspense>
        </ComponentErrorBoundary>

        {/* How to Buy */}
        <ComponentErrorBoundary fallback={<div className="p-4 text-gray-600">How to buy section unavailable</div>}>
          <Suspense fallback={<LoadingSpinner />}>
            <HowToBuy />
          </Suspense>
        </ComponentErrorBoundary>
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
