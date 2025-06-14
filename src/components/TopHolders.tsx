
const TopHolders = () => {
  const rewards = [
    { rank: 'Top 10', reward: 500000 },
    { rank: 'Top 50', reward: 250000 },
    { rank: 'Top 100', reward: 100000 },
    { rank: 'Top 200', reward: 75000 },
    { rank: 'Top 500', reward: 40000 },
    { rank: 'Top 1000', reward: 20000 },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-gray-200">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Top Holders Rewards</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map((reward) => (
          <div key={reward.rank} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-orange-50">
            <div>
              <p className="font-semibold text-gray-800">{reward.rank}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-orange-600">{reward.reward.toLocaleString()}</p>
              <p className="text-sm text-gray-500">SCT Reward</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800 text-center">
          🏆 Rewards distributed after presale completion based on final rankings
        </p>
      </div>
    </div>
  );
};

export default TopHolders;
