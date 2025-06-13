
const VIPStatus = () => {
  const currentVIP = 0;
  const userTokens = 0;

  const vipLevels = [
    { level: 1, tokens: 20000, bonus: 20 },
    { level: 2, tokens: 50000, bonus: 40 },
    { level: 3, tokens: 100000, bonus: 60 },
    { level: 4, tokens: 200000, bonus: 80 },
    { level: 5, tokens: 500000, bonus: 100 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-center mb-6">Your VIP Status</h3>
      
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-3 rounded-full text-xl font-bold">
          VIP {currentVIP}
        </div>
        <p className="text-gray-600 mt-2">You own {userTokens.toLocaleString()} SCT</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-center">VIP Levels</h4>
        {vipLevels.map((vip) => (
          <div key={vip.level} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                {vip.level}
              </div>
              <div>
                <p className="font-semibold">VIP {vip.level}</p>
                <p className="text-gray-600">{vip.tokens.toLocaleString()} SCT</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">+{vip.bonus}%</p>
              <p className="text-sm text-gray-500">Bonus</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VIPStatus;
