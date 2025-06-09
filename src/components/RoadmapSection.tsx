
const RoadmapSection = () => {
  const milestones = [
    { year: "2021", title: "Project Genesis", description: "Solar AI research and development begins", icon: "🌱", status: "completed" },
    { year: "Q1 2024", title: "Alpha Development", description: "First prototype of solar AI technology", icon: "🔬", status: "completed" },
    { year: "Q2 2024", title: "Beta Testing", description: "Closed beta with renewable energy partners", icon: "🧪", status: "completed" },
    { year: "Q3 2024", title: "Token Presale", description: "Public presale launch", icon: "🚀", status: "current" },
    { year: "Q4 2024", title: "Platform Launch", description: "Public beta with core solar features", icon: "🌞", status: "upcoming" },
    { year: "Q1 2025", title: "Mainnet Deployment", description: "Full platform deployment", icon: "⚡", status: "upcoming" },
    { year: "Q2 2025", title: "Mobile Solar App", description: "iOS and Android applications", icon: "📱", status: "upcoming" },
    { year: "Q3 2025", title: "AI Enhancements", description: "Advanced solar prediction algorithms", icon: "🧠", status: "upcoming" },
    { year: "Q4 2025", title: "Global Solar Network", description: "Worldwide solar network expansion", icon: "🌍", status: "upcoming" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-solar-gold border-solar-gold';
      case 'current': return 'text-solar-orange border-solar-orange animate-pulse-glow';
      case 'upcoming': return 'text-solar-grey border-solar-grey';
      default: return 'text-solar-grey border-solar-grey';
    }
  };

  return (
    <section id="roadmap" className="section-spacing">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-solar-warm-white">
          Solar Roadmap
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative group">
              <div className={`starburst-border rounded-lg ${milestone.status === 'current' ? 'animate-pulse-glow' : ''}`}>
                <div className="bg-solar-dark card-spacing hover:bg-solar-dark/80 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 text-lg ${getStatusColor(milestone.status)}`}>
                      {milestone.icon}
                    </div>
                    <span className={`font-bold ${getStatusColor(milestone.status)}`}>
                      {milestone.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-solar-warm-white">
                    {milestone.title}
                  </h3>
                  <p className="text-solar-grey leading-relaxed">
                    {milestone.description}
                  </p>
                  {milestone.status === 'completed' && (
                    <div className="mt-3 text-solar-gold text-sm flex items-center">
                      <span className="mr-1">✅</span>
                      Completed
                    </div>
                  )}
                  {milestone.status === 'current' && (
                    <div className="mt-3 text-solar-orange text-sm flex items-center">
                      <span className="mr-1">🔥</span>
                      In Progress
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
