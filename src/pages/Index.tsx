
import PresaleMain from '@/components/PresaleMain';
import UserBalance from '@/components/UserBalance';
import VIPStatus from '@/components/VIPStatus';
import TopHolders from '@/components/TopHolders';
import TokenDetails from '@/components/TokenDetails';
import UtilityBenefits from '@/components/UtilityBenefits';
import HowToBuy from '@/components/HowToBuy';
import CountdownTimer from '@/components/CountdownTimer';
import SolarCrowdinLogo from '@/components/SolarCrowdinLogo';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-lg border-b border-primary/20 sticky top-0 z-50">
        <div className="container-brand py-4 flex items-center justify-between">
          <SolarCrowdinLogo size="sm" />
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-primary font-orbitron font-semibold">Home</a>
            <a href="/about" className="text-foreground hover:text-primary transition-colors font-orbitron">About</a>
            <a href="/tokenomics" className="text-foreground hover:text-primary transition-colors font-orbitron">Tokenomics</a>
            <a href="/brand-guide" className="text-foreground hover:text-primary transition-colors font-orbitron">Brand</a>
          </nav>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="text-sm text-muted-foreground font-orbitron">
              © 2025 Solar Crowdin
            </div>
          </div>
        </div>
      </header>

      <div className="container-brand py-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center card-cosmic mb-16">
          <SolarCrowdinLogo size="xl" className="mb-8" />
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-cosmic mb-6">
            Join the <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Solar Revolution</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Harness the power of community-driven solar solutions with Solar Crowdin Token (SCT)
          </p>
          <div className="mb-8">
            <p className="text-lg text-primary font-orbitron mb-4">Presale ends in:</p>
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
      <footer className="bg-card py-12 mt-16 border-t border-primary/20">
        <div className="container-brand text-center">
          <SolarCrowdinLogo size="md" className="mb-6" />
          <p className="text-sm text-muted-foreground font-orbitron">© 2025 Solar Crowdin. All rights reserved.</p>
          <p className="text-xs text-muted-foreground mt-2 font-inter">
            Demo presale page - For demonstration purposes only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
