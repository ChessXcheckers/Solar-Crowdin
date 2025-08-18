
const TopHolders = () => {
  const bonusTiers = [
    { rank: 'Top 1-10', bonus: 10 },
    { rank: 'Top 11-50', bonus: 8 },
    { rank: 'Top 51-100', bonus: 6 },
    { rank: 'Top 101-250', bonus: 4 },
    { rank: 'Top 251-500', bonus: 2 },
    { rank: 'Top 501-1000', bonus: 1 },
  ];

  return (
    <div className="bg-white dark:bg-solar-dark rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-solar-warm-white">Top Contributor Bonus</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bonusTiers.map((tier) => (
          <div key={tier.rank} className="flex items-center justify-between p-4 border border-gray-200 dark:border-solar-grey/20 rounded-lg bg-gray-50 dark:bg-solar-navy/50">
            <div>
              <p className="font-semibold text-gray-800 dark:text-solar-warm-white">{tier.rank}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-orange-600 dark:text-solar-gold">+{tier.bonus}%</p>
              <p className="text-sm text-gray-800 dark:text-solar-grey">Bonus Tokens</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 dark:bg-solar-navy/70 border border-yellow-200 dark:border-yellow-200/30 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-solar-grey text-center">
          🏆 Bonuses are calculated on your total purchased tokens, up to a maximum of 10,000 extra SLC. Final rankings are determined at the end of the presale.
        </p>
      </div>
    </div>
  );
};

export default TopHolders;
