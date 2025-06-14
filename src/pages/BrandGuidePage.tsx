
import SolarCrowdinLogo from '@/components/SolarCrowdinLogo';
import BrandGuide from '@/components/BrandGuide';
import ThemeToggle from '@/components/ThemeToggle';

const BrandGuidePage = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-lg border-b border-primary/20 sticky top-0 z-50">
        <div className="container-brand py-4 flex items-center justify-between">
          <SolarCrowdinLogo size="sm" />
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors font-orbitron">Home</a>
            <a href="/about" className="text-foreground hover:text-primary transition-colors font-orbitron">About</a>
            <a href="/tokenomics" className="text-foreground hover:text-primary transition-colors font-orbitron">Tokenomics</a>
            <a href="/brand-guide" className="text-primary font-orbitron font-semibold">Brand</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <BrandGuide />
    </div>
  );
};

export default BrandGuidePage;
