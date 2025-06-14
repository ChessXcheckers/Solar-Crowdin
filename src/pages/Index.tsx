
import PresaleMain from '@/components/PresaleMain';
import UserBalance from '@/components/UserBalance';
import VIPStatus from '@/components/VIPStatus';
import TopHolders from '@/components/TopHolders';
import TokenDetails from '@/components/TokenDetails';
import UtilityBenefits from '@/components/UtilityBenefits';
import HowToBuy from '@/components/HowToBuy';
import CountdownTimer from '@/components/CountdownTimer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">
            <span className="text-orange-600">Solar</span> Crowding
          </div>
          <div className="text-sm text-gray-600">
            © 2025 Solar Crowding AI
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Join the <span className="text-orange-600">AI Solar Revolution</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Harness the power of AI-driven solar solutions with Solar Crowding Token (SCT)
          </p>
          <div className="mb-8">
            <p className="text-lg text-gray-700 mb-4">Presale ends in:</p>
            <CountdownTimer />
          </div>
        </div>

        {/* Main Presale Section */}
        <PresaleMain />

        {/* User Balance */}
        <UserBalance />

        {/* VIP Status */}
        <VIPStatus />

        {/* Top Holders Rewards */}
        <TopHolders />

        {/* Token Details */}
        <TokenDetails />

        {/* Utility & Benefits */}
        <UtilityBenefits />

        {/* How to Buy */}
        <HowToBuy />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
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
