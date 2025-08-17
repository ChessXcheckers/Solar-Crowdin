
import React from 'react';
import { Button } from './ui/button';

interface PresalePurchaseFormProps {
  amount: string;
  setAmount: (amount: string) => void;
  paymentToken: string;
  setPaymentToken: (token: string) => void;
  onBuy: () => void;
  isLoading: boolean;
  isConnected: boolean;
  marketData?: {
    eth: number;
    bnb: number;
    usdt: number;
    usdc: number;
  };
  presaleData: {
    price: string;
  };
  calculateTokens: () => string;
  calculateUSDValue: () => string;
}

const PresalePurchaseForm: React.FC<PresalePurchaseFormProps> = ({
  amount,
  setAmount,
  paymentToken,
  setPaymentToken,
  onBuy,
  isLoading,
  isConnected,
  marketData,
  presaleData,
  calculateTokens,
  calculateUSDValue
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Currency</label>
        <select 
          value={paymentToken}
          onChange={(e) => setPaymentToken(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90"
        >
          <option value="ETH">ETH {marketData && `($${marketData.eth.toLocaleString()})`}</option>
          <option value="MATIC">MATIC {marketData && `($${marketData.matic.toLocaleString()})`}</option>
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
          <span className="font-bold text-orange-600">{calculateTokens()} SLC</span>
        </div>
        {amount && (
          <div className="flex justify-between text-xs text-gray-500">
            <span>Price per token:</span>
            <span>${presaleData.price}</span>
          </div>
        )}
      </div>

      <Button
        onClick={onBuy}
        disabled={isLoading || !isConnected}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 animate-pulse-slow"
      >
        {isLoading ? 'Processing...' : 'Buy Now & Get Bonus'}
      </Button>
    </div>
  );
};

export default PresalePurchaseForm;
