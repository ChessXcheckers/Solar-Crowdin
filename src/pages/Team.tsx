
const Team = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder", 
      description: "Former Tesla engineer with 10+ years in renewable energy"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      description: "Blockchain developer with expertise in AI and smart contracts"
    },
    {
      name: "Michael Rodriguez", 
      role: "Head of Operations",
      description: "Solar industry veteran with extensive project management experience"
    },
    {
      name: "Emma Thompson",
      role: "Head of Marketing",
      description: "Digital marketing expert specializing in crypto and renewable energy"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Our <span className="text-orange-600">Team</span>
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-orange-600 text-xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{member.name}</h3>
              <p className="text-orange-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
