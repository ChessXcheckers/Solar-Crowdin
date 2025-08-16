
const VIPStatus = () => {
  const currentVIP = 0;
  const userTokens = 0;

  const vipLevels = [
    { level: 1, name: 'VIP 1', tokens: 20000, bonus: 20 },
    { level: 2, name: 'VIP 2', tokens: 50000, bonus: 40 },
    { level: 3, name: 'VIP 3', tokens: 100000, bonus: 60 },
    { level: 4, name: 'VIP 4', tokens: 200000, bonus: 80 },
    { level: 5, name: 'VIP 5', tokens: 500000, bonus: 100 },
  ];

  const nextVipLevel = vipLevels.find(vip => vip.level > currentVIP);
  const progressPercentage = nextVipLevel ? (userTokens / nextVipLevel.tokens) * 100 : 100;

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-gray-200">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Your VIP Status</h3>
      
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-3 rounded-full text-xl font-bold">
          VIP {currentVIP}
        </div>
        <p className="text-gray-600 mt-2">You own {userTokens.toLocaleString()} SLC</p>
        
        {nextVipLevel && (
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Progress to {nextVipLevel.name}</span>
            <span className="text-gray-500 text-sm">{Math.floor(progressPercentage)}%</span>
          </div>
        )}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="grid gap-4">
        {vipLevels.map((vip, index) => (
          <div key={index} className={`p-4 rounded-lg border ${currentVIP >= vip.level ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`font-semibold ${currentVIP >= vip.level ? 'text-orange-600' : 'text-gray-600'}`}>
                  {vip.name}
                </h4>
                <p className="text-gray-600">{vip.tokens.toLocaleString()} SLC</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">+{vip.bonus}%</p>
                <p className="text-sm text-gray-500">Bonus</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VIPStatus;
