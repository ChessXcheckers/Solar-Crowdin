import React from 'react';
import { FiCpu, FiBarChart2, FiLock, FiUsers, FiTrendingUp } from 'react-icons/fi';

const About: React.FC = () => {
  const impactItems = [
    {
      icon: <FiCpu size={24} className="text-orange-600" />,
      title: "Smart Energy Forecasting",
      description: "Our AI predicts energy needs in rural and urban communities, ensuring projects are designed for maximum efficiency."
    },
    {
      icon: <FiLock size={24} className="text-orange-600" />,
      title: "Automated Carbon Credit Validation",
      description: "AI verifies emissions reduction data before recording it securely on blockchain."
    },
    {
      icon: <FiTrendingUp size={24} className="text-orange-600" />,
      title: "Predictive Maintenance",
      description: "AI-powered monitoring detects system faults early, reducing downtime and increasing solar system lifespans."
    },
    {
      icon: <FiBarChart2 size={24} className="text-orange-600" />,
      title: "Market Intelligence",
      description: "AI algorithms match verified carbon credits with global buyers seeking sustainable offsets."
    }
  ];

  const whyWeExistStats = [
    { value: "600M+", text: "people in low-income countries still live without access to electricity." },
    { value: "$13B", text: "AI in the energy market is projected to surpass by 2030." },
    { value: "15x", text: "The global carbon credit demand is expected to rise by 2035." }
  ];

  const howWeDoItSteps = [
    { title: "Project Design & Optimization (AI-Powered)", description: "AI models analyze solar irradiance, weather patterns, grid demand, and land suitability to identify optimal project sites." },
    { title: "Deployment & Monitoring (IoT + AI Integration)", description: "Smart IoT sensors track real-time solar performance, energy usage, and equipment health. AI continuously optimizes power distribution and predicts maintenance." },
    { title: "Carbon Credit Measurement, Reporting & Verification (Digital MRV)", description: "Our Digital MRV platform calculates carbon emissions avoided by each project using global standards. AI ensures accuracy, and blockchain provides a unique digital identity for authenticity." },
    { title: "Blockchain Marketplace & Settlement", description: "Tokenized carbon credits allow for secure, transparent peer-to-peer transactions. Smart contracts handle payments and revenue sharing, eliminating intermediaries." },
    { title: "Community Integration & Impact Scaling", description: "Local communities access affordable, clean energy and participate in revenue-sharing. Stakeholders can track financial and social impact in real time." }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Main About Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Reimagining Climate Action with <span className="text-orange-600">Artificial Intelligence</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform doesn’t just deploy solar energy and forest projects; it thinks, learns, and optimizes them. We use AI-driven analytics to predict energy demand, monitor performance in real time, and forecast carbon credit yields with unmatched precision.
          </p>
        </section>

        {/* How We Create Impact with AI */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">How We Create Impact with AI</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {impactItems.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why We Exist */}
        <section className="bg-gray-50 rounded-xl p-10 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why We Exist</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {whyWeExistStats.map((stat, index) => (
              <div key={index}>
                <p className="text-5xl font-extrabold text-orange-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Vision */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            To become the first AI-powered renewable energy and carbon marketplace, where technology meets sustainability, and where every watt of clean energy translates into both local empowerment and global climate impact.
          </p>
        </section>

        {/* How We Do It */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">How We Do It: Our 5-Step Process</h2>
          <div className="space-y-8">
            {howWeDoItSteps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 md:mb-0 md:mr-6">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
