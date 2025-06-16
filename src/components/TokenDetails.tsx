
import { TOKEN_INFO, TOKEN_DISTRIBUTION } from '../constants/contracts';

const TokenDetails = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">SLC Token Details</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Token Information */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6">
            <h4 className="text-xl font-bold mb-4 text-orange-600">Token Information</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold text-gray-800">{TOKEN_INFO.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Symbol:</span>
                <span className="font-semibold text-gray-800">{TOKEN_INFO.symbol}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Supply:</span>
                <span className="font-semibold text-gray-800">{TOKEN_INFO.totalSupply}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Decimals:</span>
                <span className="font-semibold text-gray-800">{TOKEN_INFO.decimals}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Blockchain:</span>
                <span className="font-semibold text-gray-800">{TOKEN_INFO.blockchain}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
            <h4 className="text-xl font-bold mb-4 text-blue-600">Contract Address</h4>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <p className="font-mono text-sm text-gray-800 break-all mr-2">{TOKEN_INFO.contractAddress}</p>
              <button 
                onClick={() => navigator.clipboard.writeText(TOKEN_INFO.contractAddress)}
                className="ml-2 px-3 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Token Distribution */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold mb-4 text-gray-800">Token Distribution</h4>
          <div className="space-y-3">
            {TOKEN_DISTRIBUTION.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-semibold text-gray-800">{item.category}</span>
                  </div>
                  <span className="font-bold text-orange-600">{item.percentage}%</span>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Amount: <span className="font-medium">{item.amount} SLC</span>
                </div>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
