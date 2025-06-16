
import React, { useState, useMemo } from 'react';
import { useWallet } from '../lib/wallets';
import { usePresaleData, useBuyTokens, useMarketData } from '../lib/contracts';
import { usePresale } from '../hooks/usePresale';
import PresaleStats from './PresaleStats';
import PresaleCountdown from './PresaleCountdown';
import PresalePurchaseForm from './PresalePurchaseForm';
import PresaleUserInfo from './PresaleUserInfo';

const PresaleMain: React.FC = () => {
  console.log('PresaleMain rendering...');
  
  const [amount, setAmount] = useState('');
  const [paymentToken, setPaymentToken] = useState('ETH');
  const { address, connect } = useWallet();
  const { data: presaleData, isLoading: presaleLoading, error: presaleError } = usePresaleData();
  const { data: marketData, error: marketError } = useMarketData();
  const { presaleInfo } = usePresale();
  const buyTokens = useBuyTokens();

  // Log any errors
  if (presaleError) console.error('Presale data error:', presaleError);
  if (marketError) console.error('Market data error:', marketError);

  // Memoize calculations to prevent unnecessary re-renders
  const calculateTokens = useMemo(() => {
    if (!amount || !presaleData) return '0';
    const tokens = parseFloat(amount) / parseFloat(presaleData.price);
    return tokens.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }, [amount, presaleData]);

  const calculateUSDValue = useMemo(() => {
    if (!amount || !marketData) return '0';
    const rates: Record<string, number> = {
      'ETH': marketData.eth,
      'BNB': marketData.bnb,
      'USDT': marketData.usdt,
      'USDC': marketData.usdc
    };
    const usdValue = parseFloat(amount) * (rates[paymentToken] || 1);
    return usdValue.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
  }, [amount, marketData, paymentToken]);

  const handleBuy = async () => {
    console.log('Handle buy clicked');
    
    if (!address) {
      console.log('No address, attempting to connect wallet');
      try {
        await connect('metamask');
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      console.log('Invalid amount');
      return;
    }

    try {
      console.log('Attempting to buy tokens:', { amount, paymentToken });
      await buyTokens.mutateAsync({ amount, paymentToken });
      setAmount('');
      console.log('Buy successful');
    } catch (error) {
      console.error('Buy failed:', error);
    }
  };

  if (presaleLoading || !presaleData) {
    console.log('Presale loading or no data');
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

  console.log('Rendering PresaleMain with data:', { presaleData, marketData });

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
        calculateTokens={() => calculateTokens}
        calculateUSDValue={() => calculateUSDValue}
      />

      <PresaleUserInfo 
        address={address}
        userBalance={presaleInfo?.userBalance}
      />
    </div>
  );
};

export default PresaleMain;
