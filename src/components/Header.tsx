
import { useState } from 'react';

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectWallet = () => {
    // Placeholder for wallet connection
    setIsConnected(!isConnected);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">
          Antix
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#whitepaper" className="text-white hover:text-antix-neon transition-colors">
            Whitepaper
          </a>
          <a href="#tokenomics" className="text-white hover:text-antix-neon transition-colors">
            Tokenomics
          </a>
          <a href="#roadmap" className="text-white hover:text-antix-neon transition-colors">
            Roadmap
          </a>
        </nav>

        <button 
          onClick={handleConnectWallet}
          className="neon-button"
        >
          {isConnected ? 'Connected' : 'Connect Wallet'}
        </button>
      </div>
    </header>
  );
};

export default Header;
