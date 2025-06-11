import { motion } from 'framer-motion';
import { FiFlag, FiTarget, FiUsers, FiGlobe } from 'react-icons/fi';

const PHASES = [
  {
    title: 'Phase 1: Foundation Building',
    icon: FiFlag,
    color: 'blue',
    items: [
      'Develop and deploy the core platform and smart contracts',
      'Forge partnerships with leading solar equipment manufacturers',
      'Launch pilot lease-to-own programs in key African markets',
      'Conduct initial awareness campaigns'
    ]
  },
  {
    title: 'Phase 2: Market Entry and Expansion',
    icon: FiTarget,
    color: 'green',
    items: [
      'Roll out fractionalized solar farm investments',
      'Expand operations to five African countries',
      'Integrate the carbon credit marketplace',
      'Establish localized infrastructure'
    ]
  },
  {
    title: 'Phase 3: Growth and Community Engagement',
    icon: FiUsers,
    color: 'purple',
    items: [
      'Launch large-scale marketing campaigns',
      'Introduce staking and governance features',
      'Partner with financial institutions',
      'Collaborate with NGOs and environmental organizations'
    ]
  },
  {
    title: 'Phase 4: Global Scaling and Innovation',
    icon: FiGlobe,
    color: 'orange',
    items: [
      'Expand operations to additional global markets',
      'Develop advanced smart grid solutions',
      'Enhance platform features with AI-driven insights',
      'Foster a self-sustaining ecosystem'
    ]
  }
];

export function Roadmap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Roadmap</h2>
          <p className="mt-2 text-gray-600">
            Our journey to revolutionize renewable energy
          </p>
        </div>

        {/* Phases */}
        <div className="space-y-12">
          {PHASES.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < PHASES.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200" />
              )}

              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-${phase.color}-100`}
                >
                  <phase.icon className={`w-6 h-6 text-${phase.color}-500`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {phase.title}
                  </h3>
                  <ul className="space-y-3">
                    {phase.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + itemIndex * 0.1 }}
                        className="flex items-start space-x-2"
                      >
                        <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-gray-400" />
                        <span className="text-gray-600">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 