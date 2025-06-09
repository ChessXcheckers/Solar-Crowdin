
const FeaturesSection = () => {
  const features = [
    {
      title: "Create a new perfect you with AI",
      description: "Transform your digital presence with hyper-realistic AI avatars that capture your essence.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Monetize your digital identity",
      description: "Earn rewards by participating in the digital human ecosystem.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Next-gen avatar technology",
      description: "Powered by cutting-edge AI and blockchain technology for unprecedented realism.",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Revolutionary Digital Human Technology
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <img 
                  src={feature.image}
                  alt={feature.title}
                  className="w-72 h-72 object-cover rounded-lg mx-auto group-hover:shadow-lg group-hover:shadow-antix-neon/30 transition-shadow duration-300"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-antix-grey">
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
