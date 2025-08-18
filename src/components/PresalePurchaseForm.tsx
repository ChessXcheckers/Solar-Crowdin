
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
        <label className="block text-sm font-medium text-foreground mb-2">Select Currency</label>
        <select 
          value={paymentToken}
          onChange={(e) => setPaymentToken(e.target.value)}
          className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card/90 text-card-foreground"
        >
          <option value="ETH">ETH {marketData && `($${marketData.eth.toLocaleString()})`}</option>
          <option value="BNB">BNB {marketData && `($${marketData.bnb.toLocaleString()})`}</option>
          <option value="USDT">USDT {marketData && `($${marketData.usdt})`}</option>
          <option value="USDC">USDC {marketData && `($${marketData.usdc})`}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Enter Amount ({paymentToken})
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="w-full p-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-card/90 text-card-foreground"
        />
        {amount && (
          <p className="text-sm text-muted-foreground mt-1 font-medium">
            ≈ {calculateUSDValue()} USD
          </p>
        )}
      </div>

      <div className="bg-muted/90 backdrop-blur-sm p-4 rounded-lg border border-border">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground font-medium">You will receive:</span>
          <span className="font-bold text-primary">{calculateTokens()} SLC</span>
        </div>
        {amount && (
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Price per token:</span>
            <span>${presaleData.price}</span>
          </div>
        )}
      </div>

      <Button
        onClick={onBuy}
        disabled={isLoading || !isConnected}
        className="solar-button w-full py-3 text-lg font-semibold disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Buy Now & Get Bonus'}
      </Button>
    </div>
  );
};

export default PresalePurchaseForm;
