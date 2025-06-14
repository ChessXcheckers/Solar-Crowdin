
import SolarAILogo from '@/components/SolarAILogo';

const Tokenomics = () => {
  const distribution = [
    { category: 'Presale', percentage: 40, amount: '400M', color: 'bg-brand-gold-500' },
    { category: 'Liquidity', percentage: 20, amount: '200M', color: 'bg-brand-blue-500' },
    { category: 'Team & Advisors', percentage: 15, amount: '150M', color: 'bg-brand-red-500' },
    { category: 'Development', percentage: 10, amount: '100M', color: 'bg-purple-500' },
    { category: 'Marketing', percentage: 8, amount: '80M', color: 'bg-green-500' },
    { category: 'Reserve Fund', percentage: 7, amount: '70M', color: 'bg-orange-500' }
  ];

  const roadmap = [
    { phase: 'Phase 1', title: 'Token Launch', description: 'Presale completion and DEX listing', status: 'active' },
    { phase: 'Phase 2', title: 'AI Development', description: 'Core AI algorithms and solar integration', status: 'upcoming' },
    { phase: 'Phase 3', title: 'Solar Partnerships', description: 'Strategic partnerships with solar farms', status: 'upcoming' },
    { phase: 'Phase 4', title: 'Global Expansion', description: 'Worldwide solar network deployment', status: 'future' }
  ];

  return (
    <div className="min-h-screen bg-gradient-brand">
      {/* Header */}
      <header className="bg-brand-surface/80 backdrop-blur-lg border-b border-brand-gold/20 sticky top-0 z-50">
        <div className="container-brand py-4 flex items-center justify-between">
          <SolarAILogo size="sm" />
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-brand-white hover:text-brand-gold transition-colors font-orbitron">Home</a>
            <a href="/about" className="text-brand-white hover:text-brand-gold transition-colors font-orbitron">About</a>
            <a href="/tokenomics" className="text-brand-gold font-orbitron font-semibold">Tokenomics</a>
            <a href="/brand-guide" className="text-brand-white hover:text-brand-gold transition-colors font-orbitron">Brand</a>
          </nav>
        </div>
      </header>

      <div className="container-brand section-spacing">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-orbitron font-black text-cosmic mb-6">
            Tokenomics
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Sustainable economics powering the future of decentralized solar energy
          </p>
        </div>

        {/* Token Info */}
        <div className="card-cosmic mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-orbitron font-bold text-brand-gold mb-6">Token Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-brand-gold/20">
                  <span className="font-orbitron text-brand-white">Name</span>
                  <span className="font-orbitron font-bold text-brand-gold">Solar AI Token</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-brand-gold/20">
                  <span className="font-orbitron text-brand-white">Symbol</span>
                  <span className="font-orbitron font-bold text-brand-gold">SAI</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-brand-gold/20">
                  <span className="font-orbitron text-brand-white">Total Supply</span>
                  <span className="font-orbitron font-bold text-brand-gold">1,000,000,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-brand-gold/20">
                  <span className="font-orbitron text-brand-white">Blockchain</span>
                  <span className="font-orbitron font-bold text-brand-gold">Ethereum</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-brand-gold/20">
                  <span className="font-orbitron text-brand-white">Presale Price</span>
                  <span className="font-orbitron font-bold text-brand-gold">$0.063</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-cosmic rounded-full animate-pulse-cosmic"></div>
                <div className="absolute inset-4 bg-brand-dark rounded-full flex items-center justify-center">
                  <SolarAILogo size="lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Token Distribution */}
        <div className="card-cosmic mb-16">
          <h2 className="text-3xl font-orbitron font-bold text-brand-gold mb-8 text-center">Token Distribution</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {distribution.map((item) => (
                <div key={item.category} className="card-glass">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                      <span className="font-orbitron font-semibold text-brand-white">{item.category}</span>
                    </div>
                    <span className="font-orbitron font-bold text-brand-gold">{item.percentage}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="w-full bg-brand-dark rounded-full h-2 mr-4">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="font-orbitron text-brand-blue text-sm">{item.amount}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                {distribution.map((item, index) => {
                  const angle = (index * 360) / distribution.length;
                  const radius = 120;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <div
                      key={item.category}
                      className={`absolute w-8 h-8 rounded-full ${item.color} animate-float`}
                      style={{
                        left: `calc(50% + ${x}px - 16px)`,
                        top: `calc(50% + ${y}px - 16px)`,
                        animationDelay: `${index * 0.5}s`
                      }}
                    ></div>
                  );
                })}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-cosmic rounded-full animate-pulse-cosmic"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="card-cosmic">
          <h2 className="text-3xl font-orbitron font-bold text-brand-gold mb-8 text-center">Development Roadmap</h2>
          <div className="space-y-6">
            {roadmap.map((phase, index) => (
              <div key={phase.phase} className="card-glass">
                <div className="flex items-center space-x-4">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-orbitron font-bold
                    ${phase.status === 'active' ? 'bg-brand-gold text-brand-dark' : ''}
                    ${phase.status === 'upcoming' ? 'bg-brand-blue text-brand-white' : ''}
                    ${phase.status === 'future' ? 'bg-brand-surface border-2 border-brand-gold text-brand-gold' : ''}
                  `}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-xl font-orbitron font-bold text-brand-white">{phase.phase}</h3>
                      <span className="text-brand-gold font-orbitron font-semibold">{phase.title}</span>
                    </div>
                    <p className="text-gray-300">{phase.description}</p>
                  </div>
                  <div className={`
                    px-3 py-1 rounded-full text-xs font-orbitron font-semibold
                    ${phase.status === 'active' ? 'bg-brand-gold text-brand-dark' : ''}
                    ${phase.status === 'upcoming' ? 'bg-brand-blue text-brand-white' : ''}
                    ${phase.status === 'future' ? 'bg-brand-surface border border-brand-gold text-brand-gold' : ''}
                  `}>
                    {phase.status.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
