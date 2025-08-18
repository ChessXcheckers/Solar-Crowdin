import { motion } from 'framer-motion';
import { FiDollarSign, FiUsers, FiLock, FiTrendingUp } from 'react-icons/fi';

const TOKEN_DISTRIBUTION = [
  {
    category: 'Presale',
    percentage: 40,
    description: 'Available for public sale',
    icon: FiDollarSign
  },
  {
    category: 'Team & Advisors',
    percentage: 15,
    description: 'Vested over 2 years',
    icon: FiUsers
  },
  {
    category: 'Development',
    percentage: 20,
    description: 'Platform development and maintenance',
    icon: FiTrendingUp
  },
  {
    category: 'Reserve',
    percentage: 25,
    description: 'Locked for future expansion',
    icon: FiLock
  }
];

const TOKEN_UTILITY = [
  {
    title: 'Governance',
    description: 'Vote on platform decisions and proposals'
  },
  {
    title: 'Staking Rewards',
    description: 'Earn passive income by staking your tokens'
  },
  {
    title: 'Project Access',
    description: 'Access to exclusive solar investment opportunities'
  },
  {
    title: 'Fee Discounts',
    description: 'Reduced platform fees for token holders'
  }
];

export function Tokenomics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tokenomics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SOLAR token distribution and utility designed for long-term value
            creation and platform growth.
          </p>
        </div>

        {/* Token Distribution */}
        <div className="mb-24">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Token Distribution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TOKEN_DISTRIBUTION.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <item.icon className="w-8 h-8 text-blue-500" />
                  <span className="text-2xl font-bold text-gray-900">
                    {item.percentage}%
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.category}
                </h4>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Token Utility */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Token Utility
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TOKEN_UTILITY.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
} 