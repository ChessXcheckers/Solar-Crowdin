
const Footer = () => {
  return (
    <footer className="bg-antix-dark py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Antix</h3>
            <p className="text-antix-grey">
              Creating the future of digital humans with AI technology.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#whitepaper" className="block text-antix-grey hover:text-antix-neon transition-colors">
                Whitepaper
              </a>
              <a href="#tokenomics" className="block text-antix-grey hover:text-antix-neon transition-colors">
                Tokenomics
              </a>
              <a href="#roadmap" className="block text-antix-grey hover:text-antix-neon transition-colors">
                Roadmap
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-2">
              <a href="#" className="block text-antix-grey hover:text-antix-neon transition-colors">
                Twitter (X)
              </a>
              <a href="#" className="block text-antix-grey hover:text-antix-neon transition-colors">
                Telegram
              </a>
              <a href="#" className="block text-antix-grey hover:text-antix-neon transition-colors">
                Discord
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-antix-navy pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-antix-grey text-sm">
              © 2024 Antix. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <input 
                type="email" 
                placeholder="Enter your email for updates"
                className="bg-antix-navy border border-antix-neon rounded-l-lg px-4 py-2 text-white placeholder-antix-grey"
              />
              <button className="bg-antix-neon text-black px-4 py-2 rounded-r-lg hover:bg-antix-neon-hover transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
