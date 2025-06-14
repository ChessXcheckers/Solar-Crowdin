
import SolarAILogo from '@/components/SolarAILogo';
import BrandGuide from '@/components/BrandGuide';

const BrandGuidePage = () => {
  return (
    <div className="min-h-screen bg-gradient-brand">
      {/* Header */}
      <header className="bg-[#1A1B23]/80 backdrop-blur-lg border-b border-brand-gold-500/20 sticky top-0 z-50">
        <div className="container-brand py-4 flex items-center justify-between">
          <SolarAILogo size="sm" />
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-brand-white hover:text-brand-gold-500 transition-colors font-orbitron">Home</a>
            <a href="/about" className="text-brand-white hover:text-brand-gold-500 transition-colors font-orbitron">About</a>
            <a href="/tokenomics" className="text-brand-white hover:text-brand-gold-500 transition-colors font-orbitron">Tokenomics</a>
            <a href="/brand-guide" className="text-brand-gold-500 font-orbitron font-semibold">Brand</a>
          </nav>
        </div>
      </header>

      <BrandGuide />
    </div>
  );
};

export default BrandGuidePage;
