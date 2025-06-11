import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiTrendingUp, FiGlobe } from 'react-icons/fi';

const FEATURES = [
  {
    icon: FiShield,
    title: 'Secure Investment',
    description: 'Smart contracts ensure transparent and secure transactions'
  },
  {
    icon: FiTrendingUp,
    title: 'High Returns',
    description: 'Earn passive income from solar project revenues'
  },
  {
    icon: FiGlobe,
    title: 'Global Impact',
    description: 'Contribute to renewable energy adoption worldwide'
  }
];

export function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Invest in the Future of
              <span className="text-blue-400"> Renewable Energy</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join Solar Crowdin to participate in fractional ownership of solar
              energy assets. Earn returns while making a positive environmental
              impact.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <a
                href="#presale"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Join Presale
                <FiArrowRight className="ml-2" />
              </a>
              <a
                href="#whitepaper"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-white bg-transparent hover:bg-gray-700 transition-colors"
              >
                Read Whitepaper
              </a>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6"
              >
                <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 