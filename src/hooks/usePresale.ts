
import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
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
  maticPrice: string;
  isBlacklisted: boolean;
  userBalance: {
    matic: string;
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
  const { address } = useAccount();
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

  const fetchMaticPrice = useCallback(async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd');
      const data = await response.json();
      return data['matic-network'].usd.toString();
    } catch (error) {
      console.error('Failed to fetch MATIC price:', error);
      return '1'; // Fallback price
    }
  }, []);

  const fetchUserBalance = useCallback(async () => {
    if (!address) return { matic: '0', usdt: '0', usdc: '0', tokens: '0' };
    
    try {
      // In a real implementation, you would fetch from blockchain
      // For now, return dynamic mock data
      return {
        matic: (Math.random() * 100).toFixed(4),
        usdt: (Math.random() * 1000).toFixed(2),
        usdc: (Math.random() * 1000).toFixed(2),
        tokens: '0'
      };
    } catch (error) {
      console.error('Failed to fetch user balance:', error);
      return { matic: '0', usdt: '0', usdc: '0', tokens: '0' };
    }
  }, [address]);

  const fetchPresaleInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [maticPrice, userBalance] = await Promise.all([
        fetchMaticPrice(),
        fetchUserBalance()
      ]);

      // Simulate dynamic data from contract
      const currentTime = Math.floor(Date.now() / 1000);
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 3);
      const endTime = Math.floor(futureDate.getTime() / 1000);
      
      // Dynamic values that change over time
      const baseTime = Math.floor(Date.now() / 1000);
      const variance = Math.sin(baseTime / 1000) * 0.1; // Creates oscillation
      
      const totalSold = 142700000 + (baseTime % 1000000); // Slowly increasing
      const totalRaised = (totalSold * 0.063 / 1000000).toFixed(2);

      const mockPresaleInfo: PresaleInfo = {
        currentStage: {
          id: 1,
          price: '0.063',
          minBuy: '10',
          maxBuy: '10000',
          totalTokens: '250000000',
          soldTokens: totalSold.toString(),
          startTime: currentTime - 86400,
          endTime: endTime
        },
        totalRaised: totalRaised,
        totalSold: totalSold.toString(),
        userPurchased: address ? (Math.random() * 10000).toFixed(0) : '0',
        userReferralBonus: address ? (Math.random() * 100).toFixed(2) : '0',
        isActive: true,
        isClaimable: false,
        maticPrice,
        isBlacklisted: false,
        userBalance,
        timeLeft: calculateTimeLeft(endTime)
      };

      setPresaleInfo(mockPresaleInfo);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch presale info'));
      toast.error('Failed to fetch presale information');
    } finally {
      setLoading(false);
    }
  }, [address, fetchMaticPrice, fetchUserBalance, calculateTimeLeft]);

  // Update timer every second
  useEffect(() => {
    if (!presaleInfo) return;

    const interval = setInterval(() => {
      setPresaleInfo(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          timeLeft: calculateTimeLeft(prev.currentStage.endTime)
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [presaleInfo?.currentStage.endTime, calculateTimeLeft]);

  // Fetch data on mount and periodically
  useEffect(() => {
    fetchPresaleInfo();
    const interval = setInterval(fetchPresaleInfo, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [fetchPresaleInfo]);

  const validateAmount = useCallback((amount: string, paymentMethod: 'MATIC' | 'USDT' | 'USDC') => {
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

  const buyTokens = useCallback(async (amount: string, paymentMethod: 'MATIC' | 'USDT' | 'USDC') => {
    try {
      validateAmount(amount, paymentMethod);
      setLoading(true);

      // Simulate transaction
      const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      setTransactionStatus({
        hash: txHash,
        status: 'pending',
        type: 'buy',
        amount,
        token: paymentMethod
      });

      toast.success('Transaction initiated');

      // Simulate transaction completion
      setTimeout(() => {
        setTransactionStatus(prev => prev ? { ...prev, status: 'success' } : null);
        toast.success('Tokens purchased successfully!');
        fetchPresaleInfo(); // Refresh data
      }, 3000);

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to buy tokens';
      toast.error(message);
      setTransactionStatus(prev => prev ? { ...prev, status: 'failed' } : null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [validateAmount, fetchPresaleInfo]);

  const claimTokens = useCallback(async () => {
    try {
      setLoading(true);
      
      const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      setTransactionStatus({
        hash: txHash,
        status: 'pending',
        type: 'claim'
      });

      toast.success('Claim transaction initiated');

      setTimeout(() => {
        setTransactionStatus(prev => prev ? { ...prev, status: 'success' } : null);
        toast.success('Tokens claimed successfully!');
        fetchPresaleInfo();
      }, 3000);

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to claim tokens';
      toast.error(message);
      setTransactionStatus(prev => prev ? { ...prev, status: 'failed' } : null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchPresaleInfo]);

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
