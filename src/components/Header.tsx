import WalletConnect from './WalletConnect';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-solar-warm-white">
          <span className="nebulae-text">Solar</span> Crowding
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#whitepaper" className="text-solar-warm-white hover:text-solar-gold transition-colors duration-300">
            Whitepaper
          </a>
          <a href="#tokenomics" className="text-solar-warm-white hover:text-solar-gold transition-colors duration-300">
            Tokenomics
          </a>
          <a href="#roadmap" className="text-solar-warm-white hover:text-solar-gold transition-colors duration-300">
            Roadmap
          </a>
          <a href="#team" className="text-solar-warm-white hover:text-solar-gold transition-colors duration-300">
            Team
          </a>
        </nav>

        <WalletConnect />
      </div>
    </header>
  );
};

export default Header;
