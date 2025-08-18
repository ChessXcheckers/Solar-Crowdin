
const FeaturesSection = () => {
  const features = [
    {
      title: "Create solar-powered AI solutions",
      description: "Transform your energy footprint with AI-driven solar technology that adapts to your needs.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      icon: "☀️"
    },
    {
      title: "Monetize your solar contributions",
      description: "Earn rewards by participating in the solar energy ecosystem and contributing to a sustainable future.",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      icon: "💰"
    },
    {
      title: "Next-gen solar technology",
      description: "Powered by cutting-edge AI and blockchain technology for unprecedented efficiency and sustainability.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      icon: "🔋"
    }
  ];

  return (
    <section id="features" className="section-spacing starburst-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-solar-warm-white">
          Revolutionary Solar AI Technology
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
