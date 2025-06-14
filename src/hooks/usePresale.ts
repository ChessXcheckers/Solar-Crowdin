
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

      // Real contract integration would go here
      // For now, set basic structure without demo data
      setPresaleInfo(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch presale info'));
      toast.error('Failed to fetch presale information');
    } finally {
      setLoading(false);
    }
  }, [address]);

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
  }, []);

  const buyTokens = useCallback(async (amount: string, paymentMethod: 'BNB' | 'USDT' | 'USDC') => {
    try {
      validateAmount(amount, paymentMethod);
      setLoading(true);

      // Real contract interaction would go here
      toast.success('Connect to real contract for token purchase');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to buy tokens';
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [validateAmount]);

  const claimTokens = useCallback(async () => {
    try {
      setLoading(true);
      
      // Real contract interaction would go here
      toast.success('Connect to real contract for token claiming');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to claim tokens';
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

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
    formatAmount,
    formatAddress,
    refresh: fetchPresaleInfo
  };
}
