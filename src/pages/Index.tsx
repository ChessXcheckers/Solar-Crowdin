
import PresaleMain from '@/components/PresaleMain';
import UserBalance from '@/components/UserBalance';
import VIPStatus from '@/components/VIPStatus';
import TopHolders from '@/components/TopHolders';
import TokenDetails from '@/components/TokenDetails';
import UtilityBenefits from '@/components/UtilityBenefits';
import HowToBuy from '@/components/HowToBuy';
import CountdownTimer from '@/components/CountdownTimer';
import SolarAILogo from '@/components/SolarAILogo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-brand">
      {/* Header */}
      <header className="bg-brand-surface/80 backdrop-blur-lg border-b border-brand-gold/20 sticky top-0 z-50">
        <div className="container-brand py-4 flex items-center justify-between">
          <SolarAILogo size="sm" />
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-brand-gold font-orbitron font-semibold">Home</a>
            <a href="/about" className="text-brand-white hover:text-brand-gold transition-colors font-orbitron">About</a>
            <a href="/tokenomics" className="text-brand-white hover:text-brand-gold transition-colors font-orbitron">Tokenomics</a>
            <a href="/brand-guide" className="text-brand-white hover:text-brand-gold transition-colors font-orbitron">Brand</a>
          </nav>
          <div className="text-sm text-gray-400 font-orbitron">
            © 2025 Solar AI
          </div>
        </div>
      </header>

      <div className="container-brand py-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center card-cosmic mb-16">
          <SolarAILogo size="xl" className="mb-8" />
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-cosmic mb-6">
            Join the <span className="text-brand-blue-400">AI Solar Revolution</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Harness the power of AI-driven solar solutions with Solar AI Token (SAI)
          </p>
          <div className="mb-8">
            <p className="text-lg text-brand-gold font-orbitron mb-4">Presale ends in:</p>
            <CountdownTimer />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-cosmic">📄 Read Whitepaper</button>
            <button className="btn-gold">🔗 View Contract</button>
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
      <footer className="bg-brand-surface py-12 mt-16 border-t border-brand-gold/20">
        <div className="container-brand text-center">
          <SolarAILogo size="md" className="mb-6" />
          <p className="text-sm text-gray-400 font-orbitron">© 2025 Solar AI. All rights reserved.</p>
          <p className="text-xs text-gray-500 mt-2 font-inter">
            Demo presale page - For demonstration purposes only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
