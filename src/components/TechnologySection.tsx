import { motion } from 'framer-motion';
import { FiCpu, FiDatabase, FiShield, FiTrello, FiBox, FiLayers, FiGitMerge } from 'react-icons/fi';

const techFeatures = [
  {
    title: "Polygon Blockchain Core",
    description: "Operating on Polygon Layer-2 for low-cost, scalable, and secure transactions. Carbon credits are issued as CCO2 tokens with verifiable metadata to prevent fraud.",
    icon: FiLayers,
  },
  {
    title: "Decentralized MRV (dMRV)",
    description: "Our dMRV protocol uses satellite imagery, IoT sensors, and Chainlink oracles to automate and accelerate credit verification from months to minutes.",
    icon: FiGitMerge,
  },
  {
    title: "AI-Powered Virtual Power Station (VPS)",
    description: "Our AI models aggregate data from distributed energy systems, predicting and optimizing energy production for greater accuracy and impact.",
    icon: FiCpu,
  },
  {
    title: "Smart Contract Automation",
    description: "When dMRV data confirms carbon savings, smart contracts automatically issue CCO2 tokens to users, which can be traded on our marketplace.",
    icon: FiTrello,
  },
  {
    title: "Decentralized Marketplace & APIs",
    description: "A peer-to-peer marketplace for CCO2 tokens. Businesses can also use our APIs to integrate carbon offsetting directly into their operations.",
    icon: FiBox,
  },
  {
    title: "Digital Identity & Wallet",
    description: "Every user is issued a self-sovereign digital identity (DID) and a non-custodial wallet, ensuring privacy, compliance, and decentralization.",
    icon: FiShield,
  },
];

const TechnologySection = () => {
  return (
    <div className="py-16 bg-solar-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-solar-warm-white mb-4">
            Our Technology Stack
          </h2>
          <p className="text-xl text-solar-grey max-w-3xl mx-auto">
            A look under the hood at the technologies powering the SolarCrowdin ecosystem.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-solar-navy p-8 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <feature.icon className="w-10 h-10 text-solar-orange mr-4" />
                <h3 className="text-xl font-bold text-solar-warm-white">{feature.title}</h3>
              </div>
              <p className="text-solar-grey">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologySection;
