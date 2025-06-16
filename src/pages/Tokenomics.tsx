
import { TOKEN_INFO, TOKEN_DISTRIBUTION } from '../constants/contracts';

const Tokenomics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="text-orange-600">$SLC</span> Tokenomics
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The specific breakdown of how the $SLC token supply is allocated across various categories to ensure fair distribution and long-term sustainability.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Token Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="font-medium">Total Supply</span>
                <span className="font-bold text-orange-600">{TOKEN_INFO.totalSupply} SLC</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">Symbol</span>
                <span className="font-bold text-blue-600">{TOKEN_INFO.symbol}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium">Blockchain</span>
                <span className="font-bold text-green-600">{TOKEN_INFO.blockchain}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="font-medium">Current Price</span>
                <span className="font-bold text-purple-600">$0.063</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Distribution Summary</h3>
            <div className="space-y-3">
              {TOKEN_DISTRIBUTION.slice(0, 4).map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-gray-700">{item.category}</span>
                  </div>
                  <span className="font-bold text-gray-800">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Detailed Token Allocation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOKEN_DISTRIBUTION.map((item, index) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-gray-800">{item.category}</h4>
                  <span 
                    className="text-2xl font-bold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.percentage}%
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-sm text-gray-600">Amount: </span>
                  <span className="font-semibold text-gray-800">{item.amount} SLC</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-gradient-to-r from-orange-100 to-blue-100 rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🌞</div>
              <h4 className="font-bold text-gray-800 mb-2">Solar Innovation</h4>
              <p className="text-sm text-gray-600">AI-driven solar technology solutions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-bold text-gray-800 mb-2">Secure & Transparent</h4>
              <p className="text-sm text-gray-600">Built on proven blockchain technology</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="font-bold text-gray-800 mb-2">Community Driven</h4>
              <p className="text-sm text-gray-600">Fair distribution and community rewards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
