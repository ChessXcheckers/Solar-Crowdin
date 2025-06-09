
const Footer = () => {
  const partners = [
    { name: "HBO", logo: "🎬" },
    { name: "EA", logo: "🎮" },
    { name: "Tencent", logo: "🏢" },
    { name: "Tesla Energy", logo: "⚡" },
    { name: "SolarCity", logo: "☀️" }
  ];

  return (
    <footer className="bg-solar-dark section-spacing">
      <div className="max-w-6xl mx-auto">
        {/* Partners Section */}
        <div className="mb-12 text-center">
          <h3 className="text-xl font-semibold mb-6 text-solar-warm-white">Trusted Partners</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center space-x-2 text-solar-grey hover:text-solar-gold transition-colors duration-300">
                <span className="text-2xl">{partner.logo}</span>
                <span className="font-semibold">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-solar-warm-white">
              <span className="nebulae-text">Solar</span> Crowding
            </h3>
            <p className="text-solar-grey leading-relaxed">
              Pioneering the future of renewable energy with AI-driven solar technology and blockchain innovation.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-solar-warm-white">Quick Links</h4>
            <div className="space-y-2">
              <a href="#whitepaper" className="block text-solar-grey hover:text-solar-gold transition-colors duration-300">
                📄 Whitepaper
              </a>
              <a href="#tokenomics" className="block text-solar-grey hover:text-solar-gold transition-colors duration-300">
                📊 Tokenomics
              </a>
              <a href="#roadmap" className="block text-solar-grey hover:text-solar-gold transition-colors duration-300">
                🗺️ Roadmap
              </a>
              <a href="#team" className="block text-solar-grey hover:text-solar-gold transition-colors duration-300">
                👥 Team
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-solar-warm-white">Connect</h4>
            <div className="space-y-2">
              <a href="#" className="block text-solar-grey hover:text-solar-gold transition-colors duration-300">
                🐦 Twitter (X)
              </a>
              <a href="#" className="block text-solar-grey hover:text-solar-gold transition-colors duration-300">
                📱 Telegram
              </a>
              <a href="#" className="block text-solar-grey hover:text-solar-gold transition-colors duration-300">
                💬 Discord
              </a>
              <a href="#" className="block text-solar-grey hover:text-solar-gold transition-colors duration-300">
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-solar-navy pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-solar-grey text-sm mb-4 md:mb-0">
              © 2024 Solar Crowding. All rights reserved. 🔒 Secured by SSL
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email for solar updates"
                className="bg-solar-navy border border-solar-gold rounded-l-lg px-4 py-2 text-solar-warm-white placeholder-solar-grey focus:outline-none focus:ring-2 focus:ring-solar-gold"
              />
              <button className="bg-solar-gold text-solar-navy px-4 py-2 rounded-r-lg hover:bg-solar-orange hover:text-solar-warm-white transition-all duration-300 font-semibold">
                🚀 Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
