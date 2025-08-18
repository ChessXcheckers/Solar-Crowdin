
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from './ConnectButton';
import { ThemeSwitcher } from './ThemeSwitcher';

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Tokenomics', path: '/tokenomics' },
  { name: 'Roadmap', path: '/roadmap' },
  { name: 'Team', path: '/team' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-black/80 backdrop-blur-md shadow-xl border-b border-orange-200 dark:border-solar-dark'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/dfd85afc-5560-4a65-9550-9643be9ce3d3.png" 
                alt="SolarCrowdin Logo" 
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  location.pathname === item.path
                    ? 'text-orange-600 dark:text-solar-gold font-semibold'
                    : 'text-gray-700 dark:text-solar-grey hover:text-orange-600 dark:hover:text-solar-gold'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Wallet Connection & Theme Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <ConnectButton />
            <ThemeSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-800 dark:text-solar-grey hover:text-orange-600 dark:hover:text-solar-gold"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-xl border-t border-orange-200 dark:border-solar-dark"
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block text-base font-medium transition-colors duration-300 ${
                    location.pathname === item.path
                      ? 'text-orange-600 dark:text-solar-gold font-semibold'
                      : 'text-gray-700 dark:text-solar-grey hover:text-orange-600 dark:hover:text-solar-gold'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Wallet Connection */}
              <div className="pt-4 border-t border-gray-200 dark:border-solar-dark">
                <ConnectButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
