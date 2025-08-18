import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div className="py-16 bg-white dark:bg-solar-navy">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-solar-warm-white mb-6">
          Welcome to <span className="nebulae-text">SolarCrowdin</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-solar-grey mb-4">
          Solarcrowdin is an innovative decentralized platform that transforms clean energy and forests into verified, tradable carbon credits using blockchain, AI, and satellite-powered verification. It empowers individuals, businesses, and carbon project developers to monetize renewable energy, automate carbon offsets, and participate in a transparent, fraud-resistant carbon marketplace.
        </p>
        <p className="text-lg text-gray-600 dark:text-solar-grey">
          We use Artificial Intelligence, blockchain, and IOT to provide a decentralized platform that enables over 500M SMEs and 1.2B off-grid individuals to generate, trade, and retire verifiable carbon credits. We are automating dMRV (decentralized Measurement, Reporting, and Verification) via satellite data and smart contracts, reducing carbon credit issuance time by 70% and costs by 60%.
        </p>
        <p className="mt-4 font-semibold text-orange-600 dark:text-solar-gold">
          By merging technology with climate action, Solarcrowdin is revolutionizing the voluntary carbon market and making sustainability accessible to all.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
