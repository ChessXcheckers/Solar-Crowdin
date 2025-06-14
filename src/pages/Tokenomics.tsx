
const Tokenomics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          <span className="text-orange-600">$SOLAR</span> Tokenomics
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Token Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Presale</span>
                <span className="font-bold">40%</span>
              </div>
              <div className="flex justify-between">
                <span>Liquidity</span>
                <span className="font-bold">25%</span>
              </div>
              <div className="flex justify-between">
                <span>Development</span>
                <span className="font-bold">20%</span>
              </div>
              <div className="flex justify-between">
                <span>Team</span>
                <span className="font-bold">10%</span>
              </div>
              <div className="flex justify-between">
                <span>Marketing</span>
                <span className="font-bold">5%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Token Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Supply</span>
                <span className="font-bold">1,000,000,000</span>
              </div>
              <div className="flex justify-between">
                <span>Presale Price</span>
                <span className="font-bold">$0.063</span>
              </div>
              <div className="flex justify-between">
                <span>Launch Price</span>
                <span className="font-bold">$0.1</span>
              </div>
              <div className="flex justify-between">
                <span>Blockchain</span>
                <span className="font-bold">BSC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
