
import { useState } from 'react';
import { useWallet } from '../lib/wallets';
import { usePresaleData, useBuyTokens } from '../lib/contracts';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

const PresaleMain = () => {
  const [amount, setAmount] = useState('');
  const [paymentToken, setPaymentToken] = useState('ETH');
  const { address, connect } = useWallet();
  const { data: presaleData } = usePresaleData();
  const buyTokens = useBuyTokens();

  const calculateTokens = () => {
    if (!amount || !presaleData) return '0';
    const tokens = parseFloat(amount) / parseFloat(presaleData.price);
    return tokens.toLocaleString();
  };

  const handleBuy = async () => {
    if (!address) {
      await connect('metamask');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    try {
      await buyTokens.mutateAsync({ amount, paymentToken });
      setAmount('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Solar Crowding AI Presale</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">Current Price</p>
            <p className="text-xl font-bold text-orange-600">${presaleData?.price || '0.063'}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Next Price</p>
            <p className="text-xl font-bold text-orange-600">$0.075</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Price Increase</p>
            <p className="text-xl font-bold text-red-600">19.05%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Progress</p>
            <p className="text-xl font-bold text-blue-600">25%</p>
          </div>
        </div>
        
        <div className="mt-6">
          <Progress value={25} className="h-3" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">Tokens Sold</p>
            <p className="text-2xl font-bold text-gray-800">{presaleData?.totalSold ? `${(parseInt(presaleData.totalSold) / 1000000).toFixed(1)}M` : '142.7M'}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">USDT Raised</p>
            <p className="text-2xl font-bold text-gray-800">${presaleData?.totalRaised ? `${(parseInt(presaleData.totalRaised) / 1000000).toFixed(2)}M` : '1.34M'}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Currency</label>
          <select 
            value={paymentToken}
            onChange={(e) => setPaymentToken(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Enter Amount ({paymentToken})</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">You will receive:</span>
            <span className="font-bold text-orange-600">{calculateTokens()} SCT</span>
          </div>
        </div>

        <Button
          onClick={handleBuy}
          disabled={buyTokens.isPending}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-semibold"
        >
          {buyTokens.isPending ? 'Processing...' : address ? 'Buy Solar Crowding Tokens' : 'Connect Wallet'}
        </Button>
      </div>
    </div>
  );
};

export default PresaleMain;
