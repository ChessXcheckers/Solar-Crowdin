
import { useState, useEffect } from 'react';
import { useWallet } from '../lib/wallets';
import { usePresaleData, useBuyTokens, useMarketData } from '../lib/contracts';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { usePresale } from '../hooks/usePresale';

const PresaleMain = () => {
  const [amount, setAmount] = useState('');
  const [paymentToken, setPaymentToken] = useState('ETH');
  const { address, connect } = useWallet();
  const { data: presaleData, isLoading: presaleLoading } = usePresaleData();
  const { data: marketData } = useMarketData();
  const { presaleInfo } = usePresale();
  const buyTokens = useBuyTokens();

  const calculateTokens = () => {
    if (!amount || !presaleData) return '0';
    const tokens = parseFloat(amount) / parseFloat(presaleData.price);
    return tokens.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const calculateUSDValue = () => {
    if (!amount || !marketData) return '0';
    const rates: Record<string, number> = {
      'ETH': marketData.eth,
      'BNB': marketData.bnb,
      'USDT': marketData.usdt,
      'USDC': marketData.usdc
    };
    const usdValue = parseFloat(amount) * (rates[paymentToken] || 1);
    return usdValue.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
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

  if (presaleLoading || !presaleData) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-2xl mx-auto border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-2xl mx-auto border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 drop-shadow-sm">Solar Crowding AI Presale</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center bg-gray-50/80 rounded-lg p-3">
            <p className="text-sm text-gray-600 font-medium">Current Price</p>
            <p className="text-xl font-bold text-orange-600">${presaleData.price}</p>
          </div>
          <div className="text-center bg-gray-50/80 rounded-lg p-3">
            <p className="text-sm text-gray-600 font-medium">Next Price</p>
            <p className="text-xl font-bold text-orange-600">${presaleData.nextPrice}</p>
          </div>
          <div className="text-center bg-gray-50/80 rounded-lg p-3">
            <p className="text-sm text-gray-600 font-medium">Price Increase</p>
            <p className="text-xl font-bold text-red-600">{presaleData.priceIncrease}</p>
          </div>
          <div className="text-center bg-gray-50/80 rounded-lg p-3">
            <p className="text-sm text-gray-600 font-medium">Progress</p>
            <p className="text-xl font-bold text-blue-600">{presaleData.progress.toFixed(1)}%</p>
          </div>
        </div>
        
        <div className="mt-6">
          <Progress value={presaleData.progress} className="h-3" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center bg-gray-50/80 rounded-lg p-4">
            <p className="text-sm text-gray-600 font-medium">Tokens Sold</p>
            <p className="text-2xl font-bold text-gray-800">
              {(parseInt(presaleData.totalSold) / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className="text-center bg-gray-50/80 rounded-lg p-4">
            <p className="text-sm text-gray-600 font-medium">USDT Raised</p>
            <p className="text-2xl font-bold text-gray-800">
              ${(parseInt(presaleData.totalRaised) / 1000000).toFixed(2)}M
            </p>
          </div>
        </div>

        {presaleInfo?.timeLeft && (
          <div className="mt-6 flex justify-center space-x-4 bg-gray-50/80 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{presaleInfo.timeLeft.days}</div>
              <div className="text-sm text-gray-600 font-medium">Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{presaleInfo.timeLeft.hours}</div>
              <div className="text-sm text-gray-600 font-medium">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{presaleInfo.timeLeft.minutes}</div>
              <div className="text-sm text-gray-600 font-medium">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{presaleInfo.timeLeft.seconds}</div>
              <div className="text-sm text-gray-600 font-medium">Seconds</div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Currency</label>
          <select 
            value={paymentToken}
            onChange={(e) => setPaymentToken(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90"
          >
            <option value="ETH">ETH {marketData && `($${marketData.eth.toLocaleString()})`}</option>
            <option value="BNB">BNB {marketData && `($${marketData.bnb.toLocaleString()})`}</option>
            <option value="USDT">USDT {marketData && `($${marketData.usdt})`}</option>
            <option value="USDC">USDC {marketData && `($${marketData.usdc})`}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Amount ({paymentToken})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90"
          />
          {amount && (
            <p className="text-sm text-gray-600 mt-1 font-medium">
              ≈ {calculateUSDValue()} USD
            </p>
          )}
        </div>

        <div className="bg-gray-50/90 backdrop-blur-sm p-4 rounded-lg border">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 font-medium">You will receive:</span>
            <span className="font-bold text-orange-600">{calculateTokens()} SCT</span>
          </div>
          {amount && (
            <div className="flex justify-between text-xs text-gray-500">
              <span>Price per token:</span>
              <span>${presaleData.price}</span>
            </div>
          )}
        </div>

        <Button
          onClick={handleBuy}
          disabled={buyTokens.isPending}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-semibold shadow-lg"
        >
          {buyTokens.isPending ? 'Processing...' : address ? 'Buy Solar Crowding Tokens' : 'Connect Wallet'}
        </Button>

        {address && presaleInfo?.userBalance && (
          <div className="mt-4 p-3 bg-blue-50/90 backdrop-blur-sm rounded-lg border">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Your Balances:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="font-medium">BNB: {presaleInfo.userBalance.bnb}</div>
              <div className="font-medium">USDT: {presaleInfo.userBalance.usdt}</div>
              <div className="font-medium">USDC: {presaleInfo.userBalance.usdc}</div>
              <div className="font-medium">SCT: {presaleInfo.userBalance.tokens}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PresaleMain;
