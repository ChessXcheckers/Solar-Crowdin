import React from 'react';

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: "Dr. Igberaese Peter",
      role: "Chief Executive Officer (CEO)",
      description: "An Environmental Scientist and Climate-Tech Innovator with over 10 years of experience in AI-powered energy optimization and carbon capture forecasting. His vision is to make Solarcrowdin the leading AI-powered renewable energy and carbon credit marketplace in emerging markets."
    },
    {
      name: "Dr. Tyson Amurun",
      role: "Chief Operating Officer (COO)",
      description: "A climate finance strategist with 15+ years of experience in voluntary carbon markets. He has advised governments, multilateral agencies, and private firms on carbon credit structuring, clean energy policy, and financing models."
    },
    {
      name: "Dr. Zainab Ayoola",
      role: "Head of Climate Data & AI",
      description: "A PhD holder in Environmental Systems Modeling, Zainab is an authority in AI-driven carbon modeling and predictive analytics for renewable energy systems. She leads Solarcrowdin’s climate data intelligence."
    },
    {
      name: "Rehman Muhammad",
      role: "Chief Technology Officer (CTO)",
      description: "A Blockchain Architect with 12+ years’ experience in decentralized systems and smart contract development. He ensures security, transparency, and traceability in every carbon credit transaction."
    },
    {
      name: "Benbouzid Issa",
      role: "Head of Product & Ecosystem Growth",
      description: "A renewable energy advocate and product strategist, Issa has worked at the intersection of embedded fintech, energy access, and ESG platforms. She specializes in building API-first ecosystems and forging partnerships."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Meet Our <span className="text-orange-600">Team</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At SolarCrowdin, we believe bold ideas need brilliant execution. Our founding team brings together world-class expertise in AI, blockchain, renewable energy, climate finance, and product innovation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-50 rounded-xl shadow-sm p-6 flex flex-col text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-orange-600 text-3xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-orange-600 font-semibold mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm flex-grow">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
