import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '../lib/wallets';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import { 
  PRESALE_CONTRACT, 
  USDT_CONTRACT, 
  USDC_CONTRACT, 
  BNB_PRICE_FEED,
  PRESALE_EVENTS,
  PRESALE_ERRORS,
  PRESALE_CONSTANTS,
  TOKEN_CONTRACT
} from '../constants/contracts';

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
  const { getContract, getSigner, address } = useWallet();
  const [presaleInfo, setPresaleInfo] = useState<PresaleInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus | null>(null);

  const fetchBalances = useCallback(async (userAddress: string) => {
    try {
      const [usdtContract, usdcContract, tokenContract] = await Promise.all([
        getContract(USDT_CONTRACT.address, USDT_CONTRACT.abi),
        getContract(USDC_CONTRACT.address, USDC_CONTRACT.abi),
        getContract(TOKEN_CONTRACT.address, TOKEN_CONTRACT.abi)
      ]);

      const [usdtBalance, usdcBalance, tokenBalance] = await Promise.all([
        usdtContract.balanceOf(userAddress),
        usdcContract.balanceOf(userAddress),
        tokenContract.balanceOf(userAddress)
      ]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const bnbBalance = await provider.getBalance(userAddress);

      return {
        bnb: ethers.utils.formatEther(bnbBalance),
        usdt: ethers.utils.formatEther(usdtBalance),
        usdc: ethers.utils.formatEther(usdcBalance),
        tokens: ethers.utils.formatEther(tokenBalance)
      };
    } catch (err) {
      console.error('Failed to fetch balances:', err);
      return {
        bnb: '0',
        usdt: '0',
        usdc: '0',
        tokens: '0'
      };
    }
  }, [getContract]);

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

  const fetchBNBPrice = useCallback(async () => {
    try {
      const priceFeed = await getContract(BNB_PRICE_FEED.address, BNB_PRICE_FEED.abi);
      const { answer } = await priceFeed.latestRoundData();
      return ethers.utils.formatUnits(answer, 8);
    } catch (err) {
      console.error('Failed to fetch BNB price:', err);
      return '0';
    }
  }, [getContract]);

  const fetchPresaleInfo = useCallback(async () => {
    try {
      if (!address) {
        setLoading(false);
        return;
      }

      const contract = await getContract(PRESALE_CONTRACT.address, PRESALE_CONTRACT.abi);
      
      const [
        totalRaised,
        totalSold,
        isActive,
        isClaimable,
        tokenPrice,
        maxTokens,
        isBlacklisted,
        bnbPrice,
        startTime,
        endTime
      ] = await Promise.all([
        contract.totalUSDTRaised(),
        contract.TokenSold(),
        contract.presaleStatus(),
        contract.IsClaim(),
        contract.TokenPricePerUSDC(),
        contract.maxTokeninPresale(),
        contract.isBlacklist(address),
        fetchBNBPrice(),
        contract.startTime(),
        contract.endTime()
      ]);

      const userBalances = await fetchBalances(address);
      const timeLeft = calculateTimeLeft(endTime.toNumber());

      // Fetch recent events
      const filter = contract.filters.BuyTokens(address, null, null);
      const recentEvents = await contract.queryFilter(filter, -10000, 'latest');

      setEvents(recentEvents);
      setPresaleInfo({
        currentStage: {
          id: 1,
          price: ethers.utils.formatUnits(tokenPrice, 18),
          minBuy: PRESALE_CONSTANTS.MIN_USDT_AMOUNT,
          maxBuy: ethers.utils.formatEther(maxTokens),
          totalTokens: ethers.utils.formatEther(maxTokens),
          soldTokens: ethers.utils.formatEther(totalSold),
          startTime: startTime.toNumber(),
          endTime: endTime.toNumber()
        },
        totalRaised: ethers.utils.formatEther(totalRaised),
        totalSold: ethers.utils.formatEther(totalSold),
        userPurchased: '0', // TODO: Implement user purchase tracking
        userReferralBonus: '0', // TODO: Implement referral bonus tracking
        isActive,
        isClaimable,
        bnbPrice,
        isBlacklisted,
        userBalance: userBalances,
        timeLeft
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch presale info'));
      toast.error('Failed to fetch presale information');
    } finally {
      setLoading(false);
    }
  }, [address, getContract, fetchBNBPrice, fetchBalances, calculateTimeLeft]);

  useEffect(() => {
    fetchPresaleInfo();
    const interval = setInterval(fetchPresaleInfo, 30000);
    return () => clearInterval(interval);
  }, [fetchPresaleInfo]);

  const validateAmount = useCallback((amount: string, paymentMethod: 'BNB' | 'USDT' | 'USDC') => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      throw new Error(PRESALE_ERRORS.INVALID_AMOUNT);
    }

    const minAmount = parseFloat(
      paymentMethod === 'BNB' 
        ? PRESALE_CONSTANTS.MIN_BNB_AMOUNT 
        : paymentMethod === 'USDT' 
          ? PRESALE_CONSTANTS.MIN_USDT_AMOUNT 
          : PRESALE_CONSTANTS.MIN_USDC_AMOUNT
    );

    const maxAmount = parseFloat(
      paymentMethod === 'BNB' 
        ? PRESALE_CONSTANTS.MAX_BNB_AMOUNT 
        : paymentMethod === 'USDT' 
          ? PRESALE_CONSTANTS.MAX_USDT_AMOUNT 
          : PRESALE_CONSTANTS.MAX_USDC_AMOUNT
    );

    if (numAmount < minAmount) {
      throw new Error(`${PRESALE_ERRORS.MIN_AMOUNT_NOT_MET}: ${minAmount} ${paymentMethod}`);
    }

    if (numAmount > maxAmount) {
      throw new Error(`${PRESALE_ERRORS.MAX_TOKENS_EXCEEDED}: ${maxAmount} ${paymentMethod}`);
    }

    // Check user balance
    if (presaleInfo?.userBalance) {
      const balance = parseFloat(presaleInfo.userBalance[paymentMethod.toLowerCase()]);
      if (numAmount > balance) {
        throw new Error(PRESALE_ERRORS.INSUFFICIENT_BALANCE);
      }
    }
  }, [presaleInfo?.userBalance]);

  const calculatePrice = useCallback((amount: string, stage: Stage, paymentMethod: 'BNB' | 'USDT' | 'USDC') => {
    if (!amount) return '0';
    const amountWei = ethers.utils.parseEther(amount);
    const priceWei = ethers.utils.parseEther(stage.price);

    if (paymentMethod === 'BNB' && presaleInfo?.bnbPrice) {
      const bnbPriceWei = ethers.utils.parseEther(presaleInfo.bnbPrice);
      return ethers.utils.formatEther(amountWei.mul(bnbPriceWei).div(ethers.utils.parseEther('1')));
    }

    return ethers.utils.formatEther(amountWei.mul(priceWei).div(ethers.utils.parseEther('1')));
  }, [presaleInfo?.bnbPrice]);

  const calculateTokens = useCallback((amount: string, stage: Stage, paymentMethod: 'BNB' | 'USDT' | 'USDC') => {
    if (!amount) return '0';
    const amountWei = ethers.utils.parseEther(amount);
    const priceWei = ethers.utils.parseEther(stage.price);

    if (paymentMethod === 'BNB' && presaleInfo?.bnbPrice) {
      const bnbPriceWei = ethers.utils.parseEther(presaleInfo.bnbPrice);
      const usdtAmount = amountWei.mul(bnbPriceWei).div(ethers.utils.parseEther('1'));
      return ethers.utils.formatEther(usdtAmount.mul(ethers.utils.parseEther('1')).div(priceWei));
    }

    return ethers.utils.formatEther(amountWei.mul(ethers.utils.parseEther('1')).div(priceWei));
  }, [presaleInfo?.bnbPrice]);

  const buyTokens = useCallback(async (amount: string, paymentMethod: 'BNB' | 'USDT' | 'USDC') => {
    try {
      if (!presaleInfo?.isActive) {
        throw new Error(PRESALE_ERRORS.PRESALE_NOT_ACTIVE);
      }

      if (presaleInfo.isBlacklisted) {
        throw new Error(PRESALE_ERRORS.BLACKLISTED);
      }

      validateAmount(amount, paymentMethod);
      setLoading(true);

      const contract = await getContract(PRESALE_CONTRACT.address, PRESALE_CONTRACT.abi);
      const signer = await getSigner();
      const address = await signer.getAddress();
      
      const amountWei = ethers.utils.parseEther(amount);
      
      if (paymentMethod === 'USDT') {
        const usdtContract = await getContract(USDT_CONTRACT.address, USDT_CONTRACT.abi);
        const allowance = await usdtContract.allowance(address, PRESALE_CONTRACT.address);
        
        if (allowance.lt(amountWei)) {
          setTransactionStatus({
            hash: '',
            status: 'pending',
            type: 'approve',
            token: 'USDT'
          });
          
          const approveTx = await usdtContract.approve(PRESALE_CONTRACT.address, amountWei);
          await approveTx.wait();
          
          setTransactionStatus({
            hash: approveTx.hash,
            status: 'success',
            type: 'approve',
            token: 'USDT'
          });
        }
        
        setTransactionStatus({
          hash: '',
          status: 'pending',
          type: 'buy',
          amount,
          token: 'USDT'
        });
        
        const tx = await contract.BuyWithUSDT(amountWei);
        await tx.wait();
        
        setTransactionStatus({
          hash: tx.hash,
          status: 'success',
          type: 'buy',
          amount,
          token: 'USDT'
        });
      } else if (paymentMethod === 'USDC') {
        const usdcContract = await getContract(USDC_CONTRACT.address, USDC_CONTRACT.abi);
        const allowance = await usdcContract.allowance(address, PRESALE_CONTRACT.address);
        
        if (allowance.lt(amountWei)) {
          setTransactionStatus({
            hash: '',
            status: 'pending',
            type: 'approve',
            token: 'USDC'
          });
          
          const approveTx = await usdcContract.approve(PRESALE_CONTRACT.address, amountWei);
          await approveTx.wait();
          
          setTransactionStatus({
            hash: approveTx.hash,
            status: 'success',
            type: 'approve',
            token: 'USDC'
          });
        }
        
        setTransactionStatus({
          hash: '',
          status: 'pending',
          type: 'buy',
          amount,
          token: 'USDC'
        });
        
        const tx = await contract.BuyWithUSDC(amountWei);
        await tx.wait();
        
        setTransactionStatus({
          hash: tx.hash,
          status: 'success',
          type: 'buy',
          amount,
          token: 'USDC'
        });
      } else {
        setTransactionStatus({
          hash: '',
          status: 'pending',
          type: 'buy',
          amount,
          token: 'BNB'
        });
        
        const tx = await contract.BuyWithBNB({ value: amountWei });
        await tx.wait();
        
        setTransactionStatus({
          hash: tx.hash,
          status: 'success',
          type: 'buy',
          amount,
          token: 'BNB'
        });
      }
      
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
  }, [presaleInfo, getContract, getSigner, fetchPresaleInfo, validateAmount]);

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
      
      const contract = await getContract(PRESALE_CONTRACT.address, PRESALE_CONTRACT.abi);
      const tx = await contract.claimTokens();
      await tx.wait();
      
      setTransactionStatus({
        hash: tx.hash,
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
  }, [presaleInfo, getContract, fetchPresaleInfo]);

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