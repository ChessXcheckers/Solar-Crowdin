
import SolarAILogo from '@/components/SolarAILogo';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-brand">
      {/* Header */}
      <header className="bg-brand-surface/80 backdrop-blur-lg border-b border-brand-gold/20 sticky top-0 z-50">
        <div className="container-brand py-4 flex items-center justify-between">
          <SolarAILogo size="sm" />
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-brand-white hover:text-brand-gold transition-colors font-orbitron">Home</a>
            <a href="/about" className="text-brand-gold font-orbitron font-semibold">About</a>
            <a href="/tokenomics" className="text-brand-white hover:text-brand-gold transition-colors font-orbitron">Tokenomics</a>
            <a href="/brand-guide" className="text-brand-white hover:text-brand-gold transition-colors font-orbitron">Brand</a>
          </nav>
        </div>
      </header>

      <div className="container-brand section-spacing">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black text-cosmic mb-6">
            About Solar AI
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Revolutionizing renewable energy through artificial intelligence and blockchain technology
          </p>
        </div>

        {/* Mission Section */}
        <div className="card-cosmic mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-orbitron font-bold text-brand-gold mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-6">
                Solar AI is pioneering the future of renewable energy by combining cutting-edge artificial intelligence 
                with blockchain technology to create a decentralized solar energy ecosystem.
              </p>
              <p className="text-gray-300 mb-6">
                Our platform enables global participation in solar energy projects through fractional ownership, 
                AI-optimized energy production, and smart contract-based revenue distribution.
              </p>
              <button className="btn-cosmic">Learn More</button>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-cosmic rounded-2xl animate-pulse-cosmic"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl animate-float">🌞</div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="card-cosmic mb-16">
          <h2 className="text-3xl font-orbitron font-bold text-brand-gold mb-8 text-center">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-glass text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-orbitron font-bold text-brand-blue mb-4">AI Optimization</h3>
              <p className="text-gray-300">Machine learning algorithms optimize solar panel positioning, energy storage, and distribution efficiency.</p>
            </div>
            <div className="card-glass text-center">
              <div className="text-4xl mb-4">⛓️</div>
              <h3 className="text-xl font-orbitron font-bold text-brand-blue mb-4">Blockchain Infrastructure</h3>
              <p className="text-gray-300">Decentralized smart contracts ensure transparent revenue sharing and governance.</p>
            </div>
            <div className="card-glass text-center">
              <div className="text-4xl mb-4">☀️</div>
              <h3 className="text-xl font-orbitron font-bold text-brand-blue mb-4">Solar Integration</h3>
              <p className="text-gray-300">Direct integration with solar farms and energy grids for real-time monitoring and control.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="card-cosmic">
          <h2 className="text-3xl font-orbitron font-bold text-brand-gold mb-8 text-center">Core Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Dr. Sarah Chen', role: 'CEO & AI Research', avatar: '👩‍💼' },
              { name: 'Alex Rodriguez', role: 'CTO & Blockchain', avatar: '👨‍💻' },
              { name: 'Maya Patel', role: 'Head of Solar Tech', avatar: '👩‍🔬' },
              { name: 'James Kim', role: 'Head of Finance', avatar: '👨‍💼' }
            ].map((member) => (
              <div key={member.name} className="card-glass text-center">
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="text-lg font-orbitron font-bold text-brand-white mb-2">{member.name}</h3>
                <p className="text-brand-blue text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
