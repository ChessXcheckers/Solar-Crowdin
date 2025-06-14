
const BrandGuide = () => {
  const colorPalette = [
    { name: 'Gold Primary', hex: '#FFD700', class: 'bg-brand-gold-500' },
    { name: 'Blue Primary', hex: '#3B82F6', class: 'bg-brand-blue-500' },
    { name: 'Red Primary', hex: '#EF4444', class: 'bg-brand-red-500' },
    { name: 'Dark', hex: '#0A0B0F', class: 'bg-brand-dark' },
    { name: 'Surface', hex: '#1A1B23', class: 'bg-brand-surface' },
  ];

  const gradients = [
    { name: 'Cosmic', class: 'bg-gradient-cosmic' },
    { name: 'Gold', class: 'bg-gradient-gold' },
    { name: 'Blue', class: 'bg-gradient-blue' },
    { name: 'Red', class: 'bg-gradient-red' },
  ];

  return (
    <div className="container-brand section-spacing">
      <div className="card-cosmic">
        <h1 className="text-4xl font-orbitron font-black text-cosmic mb-8">
          Solar AI Brand Guide
        </h1>
        
        {/* Color Palette */}
        <section className="mb-12">
          <h2 className="text-2xl font-orbitron font-bold text-brand-gold mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colorPalette.map((color) => (
              <div key={color.name} className="text-center">
                <div className={`w-full h-20 rounded-lg ${color.class} mb-2 shadow-lg`}></div>
                <p className="font-orbitron font-semibold text-brand-white text-sm">{color.name}</p>
                <p className="font-mono text-xs text-gray-400">{color.hex}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gradients */}
        <section className="mb-12">
          <h2 className="text-2xl font-orbitron font-bold text-brand-gold mb-6">Brand Gradients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gradients.map((gradient) => (
              <div key={gradient.name} className="text-center">
                <div className={`w-full h-20 rounded-lg ${gradient.class} mb-2 shadow-lg`}></div>
                <p className="font-orbitron font-semibold text-brand-white text-sm">{gradient.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-12">
          <h2 className="text-2xl font-orbitron font-bold text-brand-gold mb-6">Typography</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-orbitron font-bold text-brand-blue mb-2">Orbitron (Display)</h3>
              <div className="font-orbitron text-4xl font-black text-cosmic mb-2">Solar AI</div>
              <div className="font-orbitron text-2xl font-bold text-brand-white mb-2">Heading Level 2</div>
              <div className="font-orbitron text-xl font-semibold text-brand-gold">Heading Level 3</div>
            </div>
            <div>
              <h3 className="text-xl font-orbitron font-bold text-brand-blue mb-2">Inter (Body Text)</h3>
              <div className="font-inter text-lg text-brand-white mb-2">
                Large body text for hero descriptions and important content.
              </div>
              <div className="font-inter text-base text-gray-300 mb-2">
                Regular body text for standard content and descriptions.
              </div>
              <div className="font-inter text-sm text-gray-400">
                Small text for captions, disclaimers, and secondary information.
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-12">
          <h2 className="text-2xl font-orbitron font-bold text-brand-gold mb-6">Button System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="btn-cosmic">Cosmic CTA</button>
            <button className="btn-gold">Gold Action</button>
            <button className="btn-blue">Blue Secondary</button>
            <button className="btn-red">Red Alert</button>
          </div>
        </section>

        {/* Card Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-orbitron font-bold text-brand-gold mb-6">Card Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-cosmic">
              <h3 className="text-xl font-orbitron font-bold text-brand-gold mb-2">Cosmic Card</h3>
              <p className="text-gray-300">Primary card component with cosmic glow and glass morphism.</p>
            </div>
            <div className="card-glass">
              <h3 className="text-xl font-orbitron font-bold text-brand-blue mb-2">Glass Card</h3>
              <p className="text-gray-300">Secondary card component with glass effect and subtle borders.</p>
            </div>
          </div>
        </section>

        {/* Web3 Best Practices */}
        <section>
          <h2 className="text-2xl font-orbitron font-bold text-brand-gold mb-6">Web3 Design Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-glass">
              <h3 className="text-lg font-orbitron font-bold text-brand-blue mb-2">Transparency</h3>
              <p className="text-gray-300 text-sm">Clear communication about tokenomics, smart contracts, and project goals.</p>
            </div>
            <div className="card-glass">
              <h3 className="text-lg font-orbitron font-bold text-brand-blue mb-2">Trust Indicators</h3>
              <p className="text-gray-300 text-sm">Visible contract addresses, audit reports, and team information.</p>
            </div>
            <div className="card-glass">
              <h3 className="text-lg font-orbitron font-bold text-brand-blue mb-2">User Empowerment</h3>
              <p className="text-gray-300 text-sm">Non-custodial wallet connections and user-controlled transactions.</p>
            </div>
            <div className="card-glass">
              <h3 className="text-lg font-orbitron font-bold text-brand-blue mb-2">Community Focus</h3>
              <p className="text-gray-300 text-sm">Governance features, community rewards, and social proof elements.</p>
            </div>
            <div className="card-glass">
              <h3 className="text-lg font-orbitron font-bold text-brand-blue mb-2">Performance</h3>
              <p className="text-gray-300 text-sm">Fast loading, responsive design, and optimized for mobile users.</p>
            </div>
            <div className="card-glass">
              <h3 className="text-lg font-orbitron font-bold text-brand-blue mb-2">Security First</h3>
              <p className="text-gray-300 text-sm">Secure connections, verified contracts, and safety warnings.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BrandGuide;
