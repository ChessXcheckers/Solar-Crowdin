
const TokenDetails = () => {
  const tokenInfo = {
    name: 'Solar Crowding Token',
    symbol: 'SCT',
    decimals: 18,
    contractAddress: '0x46718468baC0e1E6621BFa593f9CDEbA3f96D99e',
    totalSupply: '1,000,000,000',
    presaleAllocation: '400,000,000'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-center mb-6">Token Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-semibold text-gray-800">{tokenInfo.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Symbol</p>
            <p className="font-semibold text-gray-800">{tokenInfo.symbol}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Decimals</p>
            <p className="font-semibold text-gray-800">{tokenInfo.decimals}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Total Supply</p>
            <p className="font-semibold text-gray-800">{tokenInfo.totalSupply}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Presale Allocation</p>
            <p className="font-semibold text-gray-800">{tokenInfo.presaleAllocation}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-2">Contract Address</p>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
          <p className="font-mono text-sm text-gray-800 break-all">{tokenInfo.contractAddress}</p>
          <button 
            onClick={() => navigator.clipboard.writeText(tokenInfo.contractAddress)}
            className="ml-2 px-3 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
