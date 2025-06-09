
const PresaleCard = () => {
  return (
    <div className="starburst-border max-w-md mx-auto">
      <div className="bg-solar-dark/90 backdrop-blur-sm card-spacing rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-4 text-solar-warm-white">
            ☀️ $SOLAR Presale
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-solar-grey">
              Current Price: 
              <span className="block text-solar-gold font-bold text-lg">$0.063</span>
            </div>
            <div className="text-solar-grey">
              Listing Price: 
              <span className="block text-solar-orange font-bold text-lg">$0.14</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-solar-grey mb-2">
            <span>🔥 USD Raised</span>
            <span>$0 / $2,000,000</span>
          </div>
          <div className="w-full bg-solar-navy rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-solar-gold to-solar-orange h-3 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {['ETH', 'BNB', 'USDT', 'USDC'].map((token) => (
            <div key={token} className="starburst-border rounded-full">
              <div className="bg-solar-dark/50 p-2 text-center text-sm rounded-full hover:bg-solar-orange/10 transition-all duration-300 cursor-pointer font-semibold text-solar-warm-white">
                {token}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full solar-button text-lg font-bold">
          🚀 Join Presale
        </button>
        
        <div className="mt-4 text-center">
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
