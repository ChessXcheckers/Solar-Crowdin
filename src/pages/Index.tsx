
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
      <header className="bg-white shadow-sm border-b">
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
        {/* Countdown Timer */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Join the <span className="text-orange-600">AI Solar Revolution</span>
          </h1>
          <p className="text-gray-600 mb-8">Presale ends in:</p>
          <CountdownTimer />
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
