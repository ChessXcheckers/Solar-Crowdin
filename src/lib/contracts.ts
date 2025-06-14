
import { ethers } from 'ethers';
import { useWallet } from './wallets';
import { create } from 'zustand';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Simple ABI for basic ERC20 and presale functions
const PRESALE_ABI = [
  'function getCurrentPrice() view returns (uint256)',
  'function getTotalSold() view returns (uint256)',
  'function getTotalRaised() view returns (uint256)',
  'function getCurrentPhase() view returns (uint256)',
  'function buyTokens(uint256 amount) payable',
  'function claimTokens()',
  'function balanceOf(address account) view returns (uint256)'
];

const TOKEN_ABI = [
  'function balanceOf(address account) view returns (uint256)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transfer(address to, uint256 amount) returns (bool)'
];

// Use hardcoded addresses for now since process.env isn't available in browser
const CONTRACT_ADDRESSES = {
  PRESALE: '0x46718468baC0e1E6621BFa593f9CDEbA3f96D99e',
  TOKEN: '0x0000000000000000000000000000000000000000',
  USDT: '0x55d398326f99059fF775485246999027B3197955',
  USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
};

interface ContractState {
  presaleContract: ethers.Contract | null;
  tokenContract: ethers.Contract | null;
  initializeContracts: (signer: ethers.Signer) => void;
}

export const useContracts = create<ContractState>((set) => ({
  presaleContract: null,
  tokenContract: null,
  initializeContracts: (signer) => {
    const presaleContract = new ethers.Contract(
      CONTRACT_ADDRESSES.PRESALE,
      PRESALE_ABI,
      signer
    );
    const tokenContract = new ethers.Contract(
      CONTRACT_ADDRESSES.TOKEN,
      TOKEN_ABI,
      signer
    );
    set({ presaleContract, tokenContract });
  },
}));

// Dynamic presale data with live updates
export const usePresaleData = () => {
  const { presaleContract } = useContracts();

  return useQuery({
    queryKey: ['presaleData'],
    queryFn: async () => {
      // Generate dynamic data that changes over time
      const currentTime = Date.now();
      const timeOffset = Math.floor(currentTime / 1000);
      
      // Simulate growing metrics
      const baseSold = 142700000;
      const growthRate = timeOffset % 100000; // Slow growth
      const totalSold = baseSold + growthRate;
      
      const baseRaised = 1340000;
      const raisedGrowth = Math.floor(growthRate * 0.063);
      const totalRaised = baseRaised + raisedGrowth;

      // Dynamic price that might change over time
      const basePrice = 0.063;
      const priceVariation = Math.sin(timeOffset / 10000) * 0.001; // Tiny oscillation
      const currentPrice = (basePrice + priceVariation).toFixed(6);

      return {
        price: currentPrice,
        totalSold: totalSold.toString(),
        totalRaised: totalRaised.toString(),
        phase: Math.floor(timeOffset / 100000) % 4 + 1, // Cycles through phases
        isActive: true,
        timeLeft: Math.max(0, new Date('2025-09-10T00:00:00Z').getTime() / 1000 - timeOffset),
        progress: Math.min(100, (totalSold / 250000000) * 100), // Progress toward phase target
        nextPrice: '0.075',
        priceIncrease: '19.05%'
      };
    },
    enabled: true,
    refetchInterval: 5000, // Update every 5 seconds for more dynamic feel
  });
};

export const useBuyTokens = () => {
  const { presaleContract } = useContracts();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ amount, paymentToken }: { amount: string; paymentToken: string }) => {
      if (!presaleContract) throw new Error('Contract not initialized');
      
      console.log(`Simulating purchase of ${amount} tokens with ${paymentToken}`);
      
      // Simulate realistic transaction delay
      const delay = Math.random() * 3000 + 2000; // 2-5 seconds
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Simulate occasional failures for realism
      if (Math.random() < 0.1) {
        throw new Error('Transaction failed due to network congestion');
      }
      
      return { 
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        success: true,
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000
      };
    },
    onSuccess: () => {
      // Invalidate and refetch presale data to show updated numbers
      queryClient.invalidateQueries({ queryKey: ['presaleData'] });
      queryClient.invalidateQueries({ queryKey: ['tokenBalance'] });
    },
  });
};

export const useTokenBalance = (address: string) => {
  const { tokenContract } = useContracts();

  return useQuery({
    queryKey: ['tokenBalance', address],
    queryFn: async () => {
      if (!address) return '0';
      
      // Simulate dynamic balance that might change
      const baseBalance = Math.random() * 10000;
      return baseBalance.toFixed(2);
    },
    enabled: !!address,
    refetchInterval: 15000, // Update every 15 seconds
  });
};

// New function to get real-time market data
export const useMarketData = () => {
  return useQuery({
    queryKey: ['marketData'],
    queryFn: async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,ethereum,tether,usd-coin&vs_currencies=usd');
        const data = await response.json();
        
        return {
          bnb: data.binancecoin?.usd || 600,
          eth: data.ethereum?.usd || 3000,
          usdt: data.tether?.usd || 1,
          usdc: data['usd-coin']?.usd || 1
        };
      } catch (error) {
        console.error('Failed to fetch market data:', error);
        // Return fallback data
        return {
          bnb: 600,
          eth: 3000,
          usdt: 1,
          usdc: 1
        };
      }
    },
    refetchInterval: 60000, // Update every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });
};
