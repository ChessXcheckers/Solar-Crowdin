
const FeaturesSection = () => {
  const features = [
    {
      title: "AI-Powered Energy Solutions",
      description: "We merge AI with energy challenges, providing predictive analytics and grid optimization for low and medium-income countries.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      icon: "🤖"
    },
    {
      title: "Diverse Revenue Streams",
      description: "Generate returns from carbon trading fees, energy payment margins, and innovative lease-to-own solar projects.",
      image: "https://images.unsplash.com/photo-1639754391293-3d073b4a2a10?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      icon: "💸"
    },
    {
      title: "Own Your Impact",
      description: "Our platform allows investors to co-own renewable energy businesses, directly funding and profiting from sustainable growth in emerging markets.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      icon: "🤝"
    }
  ];

  return (
    <section id="features" className="section-spacing starburst-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-solar-warm-white">
          A New Era of Energy & Investment
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="starburst-border mb-6 rounded-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-solar-navy/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-4xl">{feature.icon}</div>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-solar-warm-white">
                {feature.title}
              </h3>
              <p className="text-solar-grey leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
