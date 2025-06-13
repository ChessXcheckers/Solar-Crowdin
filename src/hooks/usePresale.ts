
import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '../lib/wallets';
import { toast } from 'react-hot-toast';

interface Stage {
  id: number;
  price: string;
  minBuy: string;
  maxBuy: string;
  totalTokens: string;
  soldTokens: string;
  startTime: number;
  endTime: number;
}

interface PresaleInfo {
  currentStage: Stage;
  totalRaised: string;
  totalSold: string;
  userPurchased: string;
  userReferralBonus: string;
  isActive: boolean;
  isClaimable: boolean;
  bnbPrice: string;
  isBlacklisted: boolean;
  userBalance: {
    bnb: string;
    usdt: string;
    usdc: string;
    tokens: string;
  };
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

interface TransactionStatus {
  hash: string;
  status: 'pending' | 'success' | 'failed';
  type: 'buy' | 'claim' | 'approve';
  amount?: string;
  token?: string;
}

export function usePresale() {
  const { address } = useWallet();
  const [presaleInfo, setPresaleInfo] = useState<PresaleInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus | null>(null);

  const calculateTimeLeft = useCallback((endTime: number) => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(timeLeft / (24 * 60 * 60)),
      hours: Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60)),
      minutes: Math.floor((timeLeft % (60 * 60)) / 60),
      seconds: Math.floor(timeLeft % 60)
    };
  }, []);

  const fetchPresaleInfo = useCallback(async () => {
    try {
      if (!address) {
        setLoading(false);
        return;
      }

      // Mock data for now - replace with actual contract calls
      const mockPresaleInfo: PresaleInfo = {
        currentStage: {
          id: 1,
          price: '0.063',
          minBuy: '10',
          maxBuy: '10000',
          totalTokens: '1000000',
          soldTokens: '250000',
          startTime: Math.floor(Date.now() / 1000) - 86400,
          endTime: Math.floor(Date.now() / 1000) + 2592000 // 30 days from now
        },
        totalRaised: '15750',
        totalSold: '250000',
        userPurchased: '0',
        userReferralBonus: '0',
        isActive: true,
        isClaimable: false,
        bnbPrice: '600',
        isBlacklisted: false,
        userBalance: {
          bnb: '1.5',
          usdt: '1000',
          usdc: '1000',
          tokens: '0'
        },
        timeLeft: calculateTimeLeft(Math.floor(Date.now() / 1000) + 2592000)
      };

      setPresaleInfo(mockPresaleInfo);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch presale info'));
      toast.error('Failed to fetch presale information');
    } finally {
      setLoading(false);
    }
  }, [address, calculateTimeLeft]);

  useEffect(() => {
    fetchPresaleInfo();
    const interval = setInterval(fetchPresaleInfo, 30000);
    return () => clearInterval(interval);
  }, [fetchPresaleInfo]);

  const validateAmount = useCallback((amount: string, paymentMethod: 'BNB' | 'USDT' | 'USDC') => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      throw new Error('Invalid amount');
    }

    const minAmount = 10;
    const maxAmount = 10000;

    if (numAmount < minAmount) {
      throw new Error(`Minimum amount is ${minAmount} ${paymentMethod}`);
    }

    if (numAmount > maxAmount) {
      throw new Error(`Maximum amount is ${maxAmount} ${paymentMethod}`);
    }

    // Check user balance
    if (presaleInfo?.userBalance) {
      const balance = parseFloat(presaleInfo.userBalance[paymentMethod.toLowerCase()]);
      if (numAmount > balance) {
        throw new Error('Insufficient balance');
      }
    }
  }, [presaleInfo?.userBalance]);

  const calculatePrice = useCallback((amount: string, stage: Stage, paymentMethod: 'BNB' | 'USDT' | 'USDC') => {
    if (!amount) return '0';
    const numAmount = parseFloat(amount);
    const stagePrice = parseFloat(stage.price);

    if (paymentMethod === 'BNB' && presaleInfo?.bnbPrice) {
      const bnbPrice = parseFloat(presaleInfo.bnbPrice);
      return (numAmount * bnbPrice).toString();
    }

    return (numAmount * stagePrice).toString();
  }, [presaleInfo?.bnbPrice]);

  const calculateTokens = useCallback((amount: string, stage: Stage, paymentMethod: 'BNB' | 'USDT' | 'USDC') => {
    if (!amount) return '0';
    const numAmount = parseFloat(amount);
    const stagePrice = parseFloat(stage.price);

    if (paymentMethod === 'BNB' && presaleInfo?.bnbPrice) {
      const bnbPrice = parseFloat(presaleInfo.bnbPrice);
      const usdtAmount = numAmount * bnbPrice;
      return (usdtAmount / stagePrice).toString();
    }

    return (numAmount / stagePrice).toString();
  }, [presaleInfo?.bnbPrice]);

  const buyTokens = useCallback(async (amount: string, paymentMethod: 'BNB' | 'USDT' | 'USDC') => {
    try {
      if (!presaleInfo?.isActive) {
        throw new Error('Presale is not active');
      }

      if (presaleInfo.isBlacklisted) {
        throw new Error('Address is blacklisted');
      }

      validateAmount(amount, paymentMethod);
      setLoading(true);

      // Mock transaction for now
      setTransactionStatus({
        hash: '',
        status: 'pending',
        type: 'buy',
        amount,
        token: paymentMethod
      });

      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setTransactionStatus({
        hash: '0x' + Math.random().toString(16).slice(2),
        status: 'success',
        type: 'buy',
        amount,
        token: paymentMethod
      });

      toast.success('Tokens purchased successfully!');
      await fetchPresaleInfo();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to buy tokens';
      toast.error(message);

      if (transactionStatus) {
        setTransactionStatus({
          ...transactionStatus,
          status: 'failed'
        });
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [presaleInfo, fetchPresaleInfo, validateAmount, transactionStatus]);

  const claimTokens = useCallback(async () => {
    try {
      if (!presaleInfo?.isClaimable) {
        throw new Error('Tokens are not claimable yet');
      }

      setLoading(true);
      setTransactionStatus({
        hash: '',
        status: 'pending',
        type: 'claim'
      });

      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setTransactionStatus({
        hash: '0x' + Math.random().toString(16).slice(2),
        status: 'success',
        type: 'claim'
      });

      toast.success('Tokens claimed successfully!');
      await fetchPresaleInfo();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to claim tokens';
      toast.error(message);

      if (transactionStatus) {
        setTransactionStatus({
          ...transactionStatus,
          status: 'failed'
        });
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [presaleInfo, fetchPresaleInfo, transactionStatus]);

  const formatAmount = useCallback((amount: string, decimals: number = 2) => {
    return parseFloat(amount).toFixed(decimals);
  }, []);

  const formatAddress = useCallback((address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, []);

  return {
    presaleInfo,
    loading,
    error,
    events,
    transactionStatus,
    buyTokens,
    claimTokens,
    calculatePrice,
    calculateTokens,
    formatAmount,
    formatAddress,
    refresh: fetchPresaleInfo
  };
}
