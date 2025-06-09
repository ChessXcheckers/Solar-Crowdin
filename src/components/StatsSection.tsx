
const StatsSection = () => {
  const stats = [
    { label: "Total Raised", value: "$1.34M", icon: "💰", color: "text-solar-gold" },
    { label: "Tokens Sold", value: "142.7M", icon: "🪙", color: "text-solar-orange" },
    { label: "Active Investors", value: "2,847", icon: "👥", color: "text-solar-gold" },
    { label: "Days Left", value: "267", icon: "⏰", color: "text-solar-orange" }
  ];

  return (
    <section className="section-spacing starburst-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-solar-warm-white">
          Presale Statistics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="starburst-border rounded-lg group hover:scale-105 transition-transform duration-300">
              <div className="bg-solar-dark/90 p-6 text-center rounded-lg hover:bg-solar-dark/70 transition-all duration-300">
                <div className="text-4xl mb-3 group-hover:animate-starburst">{stat.icon}</div>
                <div className={`text-2xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-solar-grey text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
