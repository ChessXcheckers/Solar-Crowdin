import { motion } from 'framer-motion';
import { FiUsers, FiLock, FiTrendingUp, FiAward, FiShield, FiGitMerge, FiBox, FiBriefcase, FiZap, FiTarget, FiDollarSign } from 'react-icons/fi';

const TOKEN_DISTRIBUTION = [
  { category: 'Public Sale', percentage: 25, description: '20% at TGE, 12-month linear vest.', icon: FiUsers },
  { category: 'Private Sale', percentage: 12, description: '10% at TGE, 18-month linear vest.', icon: FiLock },
  { category: 'Seed & Strategic', percentage: 5, description: '3-month cliff, 24-month linear vest.', icon: FiAward },
  { category: 'Team & Advisors', percentage: 12, description: '6-month cliff, 36-month linear vest.', icon: FiBriefcase },
  { category: 'Ecosystem & Rewards', percentage: 20, description: '8-year vesting, halving curve.', icon: FiZap },
  { category: 'Development & Partnerships', percentage: 10, description: 'DAO-governed, 2-year vest.', icon: FiGitMerge },
  { category: 'Treasury & Reserves', percentage: 10, description: '12-month lock, DAO-governed.', icon: FiShield },
  { category: 'Community Impact Fund', percentage: 3, description: 'Audited reporting for climate initiatives.', icon: FiTarget },
  { category: 'Liquidity & Market Making', percentage: 2, description: '24-month locked LP tokens.', icon: FiBox },
  { category: 'User Incentives', percentage: 1, description: 'Airdrops for on-chain activity.', icon: FiUsers },
];

const SALE_PRICING = [
    { round: 'Seed Round', price: '$0.03', details: 'Long-term vesting for early backers.', icon: FiAward },
    { round: 'Private Round', price: '$0.04', details: 'Enforced vesting schedules.', icon: FiLock },
    { round: 'Public Sale', price: '$0.05', details: 'Aligns with scarce 1B supply.', icon: FiDollarSign },
];

const REVENUE_ALLOCATION = [
    { category: 'Buyback-and-Burn', percentage: 35, description: 'Deflationary pressure on SLC supply.', icon: FiTrendingUp },
    { category: 'Staker Rewards', percentage: 35, description: 'Rewards from real cash flow, not inflation.', icon: FiAward },
    { category: 'Treasury & Operations', percentage: 30, description: 'Sustainable platform growth.', icon: FiBriefcase },
];

export function Tokenomics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-solar-navy py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-solar-warm-white mb-4">
            Tokenomics
          </h2>
          <p className="text-xl text-solar-grey max-w-3xl mx-auto">
            A sustainable and transparent economic model designed for long-term value, scarcity, and utility. Total Supply: 1 Billion SLC.
          </p>
        </div>

        <div className="mb-24">
          <h3 className="text-2xl font-semibold text-solar-warm-white mb-8 text-center">
            Token Distribution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOKEN_DISTRIBUTION.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-solar-dark rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <item.icon className="w-8 h-8 text-solar-gold" />
                  <span className="text-2xl font-bold text-solar-warm-white">
                    {item.percentage}%
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-solar-warm-white mb-2">
                  {item.category}
                </h4>
                <p className="text-solar-grey">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-solar-warm-white mb-8 text-center">
                Sale Pricing
              </h3>
              <div className="space-y-8">
                {SALE_PRICING.map((item, index) => (
                  <motion.div
                    key={item.round}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-solar-dark rounded-lg p-6 flex items-center"
                  >
                    <item.icon className="w-10 h-10 text-solar-orange mr-6" />
                    <div>
                        <h4 className="text-lg font-semibold text-solar-warm-white">{item.round} - <span className="text-solar-gold">{item.price}</span></h4>
                        <p className="text-solar-grey">{item.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-solar-warm-white mb-8 text-center">
                Quarterly Revenue Allocation
              </h3>
              <div className="space-y-8">
                {REVENUE_ALLOCATION.map((item, index) => (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-solar-dark rounded-lg p-6 flex items-center"
                  >
                    <item.icon className="w-10 h-10 text-solar-orange mr-6" />
                     <div>
                        <h4 className="text-lg font-semibold text-solar-warm-white">{item.category} - <span className="text-solar-gold">{item.percentage}%</span></h4>
                        <p className="text-solar-grey">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
        </div>

      </div>
    </motion.div>
  );
} 