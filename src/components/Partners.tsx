import { motion } from 'framer-motion';

const PARTNERS = [
  {
    name: 'SolarCity',
    logo: '/partners/solarcity.svg',
    description: 'Leading solar energy provider'
  },
  {
    name: 'Tesla Energy',
    logo: '/partners/tesla-energy.svg',
    description: 'Innovative energy solutions'
  },
  {
    name: 'SunPower',
    logo: '/partners/sunpower.svg',
    description: 'High-efficiency solar technology'
  },
  {
    name: 'First Solar',
    logo: '/partners/first-solar.svg',
    description: 'Sustainable solar manufacturing'
  },
  {
    name: 'Canadian Solar',
    logo: '/partners/canadian-solar.svg',
    description: 'Global solar solutions'
  },
  {
    name: 'Jinko Solar',
    logo: '/partners/jinko-solar.svg',
    description: 'Premium solar products'
  }
];

export function Partners() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Collaborating with industry leaders to accelerate the global transition
            to renewable energy.
          </p>
        </div>

        {/* Partner Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow"
            >
              <div className="relative w-32 h-16 mb-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="filter grayscale hover:grayscale-0 transition-all w-full h-full object-contain"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', inset: 0 }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {partner.name}
              </h3>
              <p className="text-sm text-gray-600">{partner.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Interested in becoming a partner?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </motion.div>
  );
} 