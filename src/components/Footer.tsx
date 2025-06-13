
import { FiTwitter, FiGithub, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-solar-dark py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-solar-warm-white mb-4">
              <span className="nebulae-text">Solar</span> Crowding
            </h3>
            <p className="text-solar-grey">
              Powering the future with solar-driven AI technology.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-solar-warm-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-solar-grey hover:text-solar-gold transition-colors">Features</a></li>
              <li><a href="#tokenomics" className="text-solar-grey hover:text-solar-gold transition-colors">Tokenomics</a></li>
              <li><a href="#roadmap" className="text-solar-grey hover:text-solar-gold transition-colors">Roadmap</a></li>
              <li><a href="#team" className="text-solar-grey hover:text-solar-gold transition-colors">Team</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-solar-warm-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-solar-grey hover:text-solar-gold transition-colors">Whitepaper</a></li>
              <li><a href="#" className="text-solar-grey hover:text-solar-gold transition-colors">Documentation</a></li>
              <li><a href="#faq" className="text-solar-grey hover:text-solar-gold transition-colors">FAQ</a></li>
              <li><a href="#" className="text-solar-grey hover:text-solar-gold transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-solar-warm-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-solar-grey hover:text-solar-gold transition-colors">
                <FiTwitter size={24} />
              </a>
              <a href="#" className="text-solar-grey hover:text-solar-gold transition-colors">
                <FiGithub size={24} />
              </a>
              <a href="#" className="text-solar-grey hover:text-solar-gold transition-colors">
                <FiMail size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-solar-grey/20 mt-8 pt-8 text-center">
          <p className="text-solar-grey">
            © 2024 Solar Crowding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
