
import { Wallet, CreditCard, DollarSign, ShoppingCart, CheckCircle, Download } from 'lucide-react';

const HowToBuy = () => {
  const steps = [
    {
      step: 1,
      icon: Wallet,
      title: 'Set Up Wallet',
      description: 'Install MetaMask or connect your preferred wallet with BNB for gas fees'
    },
    {
      step: 2,
      icon: CreditCard,
      title: 'Select Currency',
      description: 'Choose from BNB, USDT, or USDC to purchase SLC tokens'
    },
    {
      step: 3,
      icon: DollarSign,
      title: 'Enter Amount',
      description: 'Specify how much you want to invest in the presale'
    },
    {
      step: 4,
      icon: ShoppingCart,
      title: 'Click Buy',
      description: 'Review your purchase and confirm the transaction'
    },
    {
      step: 5,
      icon: CheckCircle,
      title: 'Approve Transaction',
      description: 'Approve the token spending for USDT/USDC transactions'
    },
    {
      step: 6,
      icon: Download,
      title: 'Import Token',
      description: 'Add SLC to your wallet using the contract address'
    }
  ];

  return (
    <div className="bg-white dark:bg-solar-dark rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-solar-warm-white">How to Buy Solar Crowding Tokens</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div key={step.step} className="text-center p-4 border dark:border-solar-grey/20 rounded-lg hover:shadow-md dark:hover:bg-solar-navy/50 transition-all">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg relative">
                <step.icon className="w-8 h-8" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
                  {step.step}
                </div>
              </div>
            </div>
            <h4 className="font-semibold text-gray-800 dark:text-solar-warm-white mb-2">{step.title}</h4>
            <p className="text-sm text-gray-600 dark:text-solar-grey">{step.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-solar-navy/70 border border-blue-200 dark:border-blue-200/30 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-solar-grey text-center">
          💡 Need help? Join our community for step-by-step guidance and support
        </p>
      </div>
    </div>
  );
};

export default HowToBuy;
