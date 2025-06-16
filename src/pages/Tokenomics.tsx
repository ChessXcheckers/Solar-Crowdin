
import { TOKEN_INFO, TOKEN_DISTRIBUTION } from '../constants/contracts';

const Tokenomics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-slate-900/30 to-orange-900/20 relative backdrop-blur-sm pt-16">
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-orange-500/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            <span className="text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text">$SLC</span> Tokenomics
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl">
            The specific breakdown of how the $SLC token supply is allocated across various categories to ensure fair distribution and long-term sustainability.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6 text-center drop-shadow-lg">Token Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 backdrop-blur-sm bg-gradient-to-r from-orange-500/20 to-orange-600/10 rounded-xl border border-white/20">
                <span className="font-medium text-white">Total Supply</span>
                <span className="font-bold text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-xl">{TOKEN_INFO.totalSupply} SLC</span>
              </div>
              <div className="flex justify-between items-center p-4 backdrop-blur-sm bg-gradient-to-r from-blue-500/20 to-blue-600/10 rounded-xl border border-white/20">
                <span className="font-medium text-white">Symbol</span>
                <span className="font-bold text-white text-xl">{TOKEN_INFO.symbol}</span>
              </div>
              <div className="flex justify-between items-center p-4 backdrop-blur-sm bg-gradient-to-r from-green-500/20 to-green-600/10 rounded-xl border border-white/20">
                <span className="font-medium text-white">Blockchain</span>
                <span className="font-bold text-white text-xl">{TOKEN_INFO.blockchain}</span>
              </div>
              <div className="flex justify-between items-center p-4 backdrop-blur-sm bg-gradient-to-r from-purple-500/20 to-purple-600/10 rounded-xl border border-white/20">
                <span className="font-medium text-white">Current Price</span>
                <span className="font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-xl">$0.063</span>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6 text-center drop-shadow-lg">Distribution Summary</h3>
            <div className="space-y-4">
              {TOKEN_DISTRIBUTION.slice(0, 4).map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 backdrop-blur-sm bg-white/5 rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full shadow-lg border border-white/30"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-white font-medium">{item.category}</span>
                  </div>
                  <span className="font-bold text-white text-lg">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Distribution */}
        <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center drop-shadow-lg">Detailed Token Allocation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOKEN_DISTRIBUTION.map((item, index) => (
              <div key={index} className="backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg text-white">{item.category}</h4>
                  <span 
                    className="text-2xl font-bold px-4 py-2 rounded-full text-white shadow-xl border-2 border-white/30"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.percentage}%
                  </span>
                </div>
                <div className="mb-4 p-3 backdrop-blur-sm bg-white/10 rounded-lg border border-white/20">
                  <span className="text-sm text-white/80">Amount: </span>
                  <span className="font-semibold text-white">{item.amount} SLC</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-12 backdrop-blur-md bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-6 text-center drop-shadow-lg">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/20 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-4">🌞</div>
              <h4 className="font-bold text-white mb-3">Solar Innovation</h4>
              <p className="text-sm text-white/80">AI-driven solar technology solutions</p>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/20 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="font-bold text-white mb-3">Secure & Transparent</h4>
              <p className="text-sm text-white/80">Built on proven blockchain technology</p>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/20 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="font-bold text-white mb-3">Community Driven</h4>
              <p className="text-sm text-white/80">Fair distribution and community rewards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
