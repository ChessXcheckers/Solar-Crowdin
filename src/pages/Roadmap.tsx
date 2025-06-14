
const Roadmap = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Foundation",
      items: ["Token Launch", "Website Development", "Community Building", "Initial Partnerships"]
    },
    {
      phase: "Phase 2", 
      title: "Development",
      items: ["Platform Development", "AI Integration", "Solar Farm Partnerships", "Beta Testing"]
    },
    {
      phase: "Phase 3",
      title: "Expansion", 
      items: ["Global Launch", "Advanced AI Features", "Mobile App", "International Partnerships"]
    },
    {
      phase: "Phase 4",
      title: "Innovation",
      items: ["DeFi Integration", "NFT Marketplace", "Governance Token", "Ecosystem Expansion"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Project <span className="text-orange-600">Roadmap</span>
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-orange-600 font-bold text-sm mb-2">{item.phase}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
              <ul className="space-y-2">
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex} className="text-gray-600 text-sm">• {subItem}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
