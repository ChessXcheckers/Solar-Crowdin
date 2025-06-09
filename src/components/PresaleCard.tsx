
const PresaleCard = () => {
  return (
    <div className="starburst-border max-w-lg mx-auto">
      <div className="bg-solar-dark/95 backdrop-blur-sm card-spacing rounded-lg">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2 text-solar-warm-white">
            <span className="nebulae-text">Solar Crowding</span> Presale
          </h3>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold">Phase 1 is Live!</span>
          </div>
        </div>

        {/* Price Information */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="starburst-border rounded-lg">
            <div className="bg-solar-navy/50 p-4 text-center rounded-lg">
              <div className="text-solar-grey text-sm mb-1">💰 Current Price</div>
              <div className="text-solar-gold font-bold text-xl">$0.063</div>
            </div>
          </div>
          <div className="starburst-border rounded-lg">
            <div className="bg-solar-navy/50 p-4 text-center rounded-lg">
              <div className="text-solar-grey text-sm mb-1">🚀 Next Price</div>
              <div className="text-solar-orange font-bold text-xl">$0.14</div>
            </div>
          </div>
        </div>

        {/* Price Increase */}
        <div className="starburst-border rounded-lg mb-6">
          <div className="bg-solar-navy/50 p-4 text-center rounded-lg">
            <div className="text-solar-grey text-sm mb-1">📈 Price Increase</div>
            <div className="text-green-400 font-bold text-lg">+122%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-solar-grey mb-2">
            <span>Progress</span>
            <span>28.54%</span>
          </div>
          <div className="w-full bg-solar-navy rounded-full h-4 overflow-hidden starburst-border">
            <div className="bg-gradient-to-r from-solar-gold to-solar-orange h-4 rounded-full transition-all duration-500" style={{ width: '28.54%' }}></div>
          </div>
        </div>

        {/* Tokens Sold */}
        <div className="starburst-border rounded-lg mb-6">
          <div className="bg-solar-navy/30 p-4 text-center rounded-lg">
            <div className="text-solar-grey text-sm mb-1">Tokens Sold</div>
            <div className="text-solar-warm-white font-bold text-xl">142,795,442</div>
          </div>
        </div>

        {/* USDT Raised */}
        <div className="starburst-border rounded-lg mb-6">
          <div className="bg-solar-navy/30 p-4 text-center rounded-lg">
            <div className="text-solar-grey text-sm mb-1">USDT Raised</div>
            <div className="text-solar-warm-white font-bold text-xl">$1,342,954</div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {['ETH', 'BNB', 'USDT', 'USDC'].map((token) => (
            <div key={token} className="starburst-border rounded-lg">
              <div className="bg-solar-dark/50 p-3 text-center text-sm rounded-lg hover:bg-solar-orange/10 transition-all duration-300 cursor-pointer font-semibold text-solar-warm-white cosmic-glow">
                {token}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full solar-button text-lg font-bold mb-4 cosmic-glow">
          🚀 Join Presale
        </button>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-solar-grey">
            <span>🔒</span>
            <span>Secured by SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresaleCard;
