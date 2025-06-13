
import WalletConnect from './WalletConnect';

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-solar-warm-white">
          <span className="nebulae-text">Solar</span> Crowding
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('features')}
            className="text-solar-warm-white hover:text-solar-gold transition-colors duration-300"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('tokenomics')}
            className="text-solar-warm-white hover:text-solar-gold transition-colors duration-300"
          >
            Tokenomics
          </button>
          <button 
            onClick={() => scrollToSection('roadmap')}
            className="text-solar-warm-white hover:text-solar-gold transition-colors duration-300"
          >
            Roadmap
          </button>
          <button 
            onClick={() => scrollToSection('team')}
            className="text-solar-warm-white hover:text-solar-gold transition-colors duration-300"
          >
            Team
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className="text-solar-warm-white hover:text-solar-gold transition-colors duration-300"
          >
            FAQ
          </button>
        </nav>

        <WalletConnect />
      </div>
    </header>
  );
};

export default Header;
