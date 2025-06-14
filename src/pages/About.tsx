
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          About <span className="text-orange-600">Solar Crowding</span>
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Solar Crowding is revolutionizing the renewable energy sector through AI-driven 
            digital solutions that make solar energy accessible to everyone.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To democratize solar energy through blockchain technology and artificial intelligence, 
            creating a sustainable future for all.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-600">
            A world where clean, renewable energy is accessible, affordable, and efficiently 
            distributed through cutting-edge technology and community participation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
