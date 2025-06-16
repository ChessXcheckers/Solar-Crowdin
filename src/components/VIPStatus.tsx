
const VIPStatus = () => {
  const currentVIP = 0;
  const userTokens = 0;

  const vipLevels = [
    { level: 1, tokens: 20000, bonus: 20, emoji: "🌤️", glow: "from-yellow-200 to-yellow-300" },
    { level: 2, tokens: 50000, bonus: 40, emoji: "☀️", glow: "from-yellow-300 to-orange-300" },
    { level: 3, tokens: 100000, bonus: 60, emoji: "🌞", glow: "from-orange-300 to-orange-400" },
    { level: 4, tokens: 200000, bonus: 80, emoji: "✨☀️✨", glow: "from-orange-400 to-red-400" },
    { level: 5, tokens: 500000, bonus: 100, emoji: "💥☀️💥", glow: "from-red-400 to-pink-400" },
  ];

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20">
      <h3 className="text-2xl font-bold text-center mb-6 text-white drop-shadow-lg">Your VIP Status</h3>
      
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-2xl border border-white/30">
          <span className="text-3xl mr-2">🌤️</span>
          VIP {currentVIP}
        </div>
        <p className="text-white/90 mt-4 font-medium backdrop-blur-sm bg-white/10 inline-block px-4 py-2 rounded-full border border-white/20">
          You own {userTokens.toLocaleString()} SLC
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-center text-white/90 mb-6">VIP Levels & Solar Power</h4>
        {vipLevels.map((vip) => (
          <div 
            key={vip.level} 
            className="backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${vip.glow} rounded-full flex items-center justify-center text-2xl shadow-2xl border-2 border-white/30`}>
                  {vip.emoji}
                </div>
                <div>
                  <p className="font-bold text-xl text-white">VIP {vip.level}</p>
                  <p className="text-white/80 font-medium">{vip.tokens.toLocaleString()} SLC</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-2xl text-green-400 drop-shadow-lg">+{vip.bonus}%</p>
                <p className="text-sm text-white/70">Solar Bonus</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VIPStatus;
