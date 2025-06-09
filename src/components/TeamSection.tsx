
const TeamSection = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      title: "CEO & Founder",
      bio: "Former Meta AI researcher with 10+ years in computer vision and machine learning.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      linkedin: "#"
    },
    {
      name: "Sarah Rodriguez",
      title: "CTO",
      bio: "Blockchain architect and former Ethereum core developer with expertise in smart contracts.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      linkedin: "#"
    },
    {
      name: "Marcus Thompson",
      title: "Head of AI",
      bio: "PhD in AI from Stanford, specializing in generative models and neural networks.",
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      linkedin: "#"
    },
    {
      name: "Emma Wilson",
      title: "Head of Design",
      bio: "Award-winning UX designer with experience at Apple and Google.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      linkedin: "#"
    },
    {
      name: "David Kim",
      title: "Head of Marketing",
      bio: "Growth hacker who scaled multiple crypto projects from 0 to millions of users.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      linkedin: "#"
    }
  ];

  return (
    <section className="py-20 px-4 bg-antix-dark/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Meet the Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-antix-dark p-6 rounded-lg hover:shadow-lg hover:shadow-antix-neon/20 hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-antix-neon font-semibold mb-3">{member.title}</p>
                <p className="text-antix-grey text-sm mb-4">{member.bio}</p>
                <a 
                  href={member.linkedin} 
                  className="text-antix-neon hover:text-antix-neon-hover transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
