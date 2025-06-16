
import { TOKEN_INFO, TOKEN_DISTRIBUTION } from '../constants/contracts';

const TokenDetails = () => {
  return (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20">
      <h3 className="text-2xl font-bold text-center mb-6 text-white drop-shadow-lg">SLC Token Details</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Token Information */}
        <div className="space-y-6">
          <div className="backdrop-blur-md bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl p-6 border border-white/20 shadow-xl">
            <h4 className="text-xl font-bold mb-4 text-white drop-shadow-lg">Token Information</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center backdrop-blur-sm bg-white/10 p-3 rounded-xl border border-white/20">
                <span className="text-white/80">Name:</span>
                <span className="font-semibold text-white">{TOKEN_INFO.name}</span>
              </div>
              <div className="flex justify-between items-center backdrop-blur-sm bg-white/10 p-3 rounded-xl border border-white/20">
                <span className="text-white/80">Symbol:</span>
                <span className="font-semibold text-white">{TOKEN_INFO.symbol}</span>
              </div>
              <div className="flex justify-between items-center backdrop-blur-sm bg-white/10 p-3 rounded-xl border border-white/20">
                <span className="text-white/80">Total Supply:</span>
                <span className="font-semibold text-white">{TOKEN_INFO.totalSupply}</span>
              </div>
              <div className="flex justify-between items-center backdrop-blur-sm bg-white/10 p-3 rounded-xl border border-white/20">
                <span className="text-white/80">Decimals:</span>
                <span className="font-semibold text-white">{TOKEN_INFO.decimals}</span>
              </div>
              <div className="flex justify-between items-center backdrop-blur-sm bg-white/10 p-3 rounded-xl border border-white/20">
                <span className="text-white/80">Blockchain:</span>
                <span className="font-semibold text-white">{TOKEN_INFO.blockchain}</span>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-md bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl p-6 border border-white/20 shadow-xl">
            <h4 className="text-xl font-bold mb-4 text-white drop-shadow-lg">Contract Address</h4>
            <div className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/10 rounded-xl border border-white/20">
              <p className="font-mono text-sm text-white break-all mr-2">{TOKEN_INFO.contractAddress}</p>
              <button 
                onClick={() => navigator.clipboard.writeText(TOKEN_INFO.contractAddress)}
                className="ml-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg text-xs hover:shadow-lg transition-all duration-200 font-medium"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Token Distribution */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold mb-4 text-white drop-shadow-lg">Token Distribution</h4>
          <div className="space-y-3">
            {TOKEN_DISTRIBUTION.map((item, index) => (
              <div key={index} className="backdrop-blur-md bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 border border-white/20 hover:shadow-xl hover:scale-[1.02]">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full shadow-lg border border-white/30"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-semibold text-white">{item.category}</span>
                  </div>
                  <span className="font-bold text-2xl text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text">{item.percentage}%</span>
                </div>
                <div className="text-sm text-white/80 mb-1">
                  Amount: <span className="font-medium text-white">{item.amount} SLC</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
