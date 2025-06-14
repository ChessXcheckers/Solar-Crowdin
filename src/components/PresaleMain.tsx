
import { useState } from 'react';
import { useWallet } from '../lib/wallets';
import { usePresaleData, useBuyTokens, useMarketData } from '../lib/contracts';
import { usePresale } from '../hooks/usePresale';
import PresaleStats from './PresaleStats';
import PresaleCountdown from './PresaleCountdown';
import PresalePurchaseForm from './PresalePurchaseForm';
import PresaleUserInfo from './PresaleUserInfo';

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
      <PresaleStats presaleData={presaleData} />
      
      {presaleInfo?.timeLeft && (
        <PresaleCountdown timeLeft={presaleInfo.timeLeft} />
      )}

      <PresalePurchaseForm
        amount={amount}
        setAmount={setAmount}
        paymentToken={paymentToken}
        setPaymentToken={setPaymentToken}
        onBuy={handleBuy}
        isLoading={buyTokens.isPending}
        isConnected={!!address}
        marketData={marketData}
        presaleData={presaleData}
        calculateTokens={calculateTokens}
        calculateUSDValue={calculateUSDValue}
      />

      <PresaleUserInfo 
        address={address}
        userBalance={presaleInfo?.userBalance}
      />
    </div>
  );
};

export default PresaleMain;
