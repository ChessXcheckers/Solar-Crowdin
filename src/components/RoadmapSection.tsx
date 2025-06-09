
const RoadmapSection = () => {
  const milestones = [
    { year: "2021", title: "Project Inception", description: "Research and development begins" },
    { year: "Q1 2024", title: "MVP Development", description: "First prototype of digital human technology" },
    { year: "Q2 2024", title: "Alpha Testing", description: "Closed alpha with select partners" },
    { year: "Q3 2024", title: "Token Presale", description: "Public presale launch" },
    { year: "Q4 2024", title: "Beta Launch", description: "Public beta with core features" },
    { year: "Q1 2025", title: "Mainnet Launch", description: "Full platform deployment" },
    { year: "Q2 2025", title: "Mobile App", description: "iOS and Android applications" },
    { year: "Q3 2025", title: "AI Enhancements", description: "Advanced AI features and improvements" },
    { year: "Q4 2025", title: "Global Expansion", description: "Worldwide platform rollout" }
  ];

  return (
    <section id="roadmap" className="py-20 px-4 bg-antix-dark/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Roadmap
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative">
              <div className="bg-antix-dark p-6 rounded-lg hover:shadow-lg hover:shadow-antix-neon/20 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-antix-neon rounded-full mr-3"></div>
                  <span className="text-antix-neon font-bold">{milestone.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
                <p className="text-antix-grey">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
