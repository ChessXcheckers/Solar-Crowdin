import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-orange-600">SolarCrowdin</span>
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          At SolarCrowdin, we are not just building solar projects; we are using AI to power a cleaner, smarter future.
        </p>
        <p className="text-lg text-gray-600">
          Our platform combines Artificial Intelligence, Blockchain, and Renewable Energy to deliver transparent, efficient, and scalable clean energy and forestation solutions. With Artificial Intelligence at the core, we predict energy needs, optimize solar systems, and verify carbon credits in real-time, ensuring impact for communities and trust for investors.
        </p>
        <p className="mt-4 font-semibold text-orange-600">
          We are the first AI-powered renewable energy and reforestation marketplace, where every watt of clean energy creates both local empowerment and global climate impact.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
