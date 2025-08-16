
import { Coins, TrendingUp, Zap, Vote } from 'lucide-react';

const UtilityBenefits = () => {
  const benefits = [
    {
      icon: Coins,
      title: 'Earn Bonuses during Presale',
      description: 'Get additional tokens through VIP tiers and early bird bonuses'
    },
    {
      icon: TrendingUp,
      title: 'Staking for Passive Rewards',
      description: 'Stake your SLC tokens to earn passive income and additional rewards'
    },
    {
      icon: Zap,
      title: 'AI Solar Model Training',
      description: 'Participate in AI model training for solar optimization and earn tokens'
    },
    {
      icon: Vote,
      title: 'Governance Voting Power',
      description: 'Vote on important project decisions and shape the future of Solar Crowding'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-center mb-6">Utility & Benefits</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UtilityBenefits;
