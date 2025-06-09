
const TeamSection = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      title: "CEO & Founder",
      bio: "Former Tesla energy researcher with 12+ years in solar technology and AI integration.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      linkedin: "#",
      icon: "👩‍💼"
    },
    {
      name: "Marcus Rodriguez",
      title: "CTO",
      bio: "Blockchain architect and former SolarCity core developer with expertise in renewable energy smart contracts.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      linkedin: "#",
      icon: "👨‍💻"
    },
    {
      name: "Dr. Emily Thompson",
      title: "Head of AI Research",
      bio: "PhD in Renewable Energy AI from MIT, specializing in solar prediction models and optimization algorithms.",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      linkedin: "#",
      icon: "🧠"
    },
    {
      name: "James Wilson",
      title: "Head of Sustainability",
      bio: "Award-winning environmental engineer with experience at Google's renewable energy division.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      linkedin: "#",
      icon: "🌱"
    },
    {
      name: "Lisa Kim",
      title: "Head of Partnerships",
      bio: "Growth strategist who scaled multiple clean energy projects from startup to global deployment.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      linkedin: "#",
      icon: "🤝"
    }
  ];

  return (
    <section id="team" className="section-spacing">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-solar-warm-white">
          Meet Our Solar Pioneers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="starburst-border rounded-lg overflow-hidden group">
              <div className="bg-solar-dark card-spacing hover:bg-solar-dark/80 transition-all duration-300">
                <div className="text-center">
                  <div className="relative mb-4 mx-auto w-24 h-24">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full border-4 border-solar-gold group-hover:border-solar-orange transition-colors duration-300"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-2 -right-2 text-2xl bg-solar-navy rounded-full p-1">
                      {member.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-solar-warm-white">{member.name}</h3>
                  <p className="text-solar-gold font-semibold mb-3">{member.title}</p>
                  <p className="text-solar-grey text-sm mb-4 leading-relaxed">{member.bio}</p>
                  <a 
                    href={member.linkedin} 
                    className="inline-flex items-center space-x-2 text-solar-gold hover:text-solar-orange transition-colors duration-300"
                  >
                    <span>🔗</span>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
