
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

const CONTRACT_ADDRESSES = {
  PRESALE: process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS || '0x46718468baC0e1E6621BFa593f9CDEbA3f96D99e',
  TOKEN: process.env.NEXT_PUBLIC_TOKEN_ADDRESS || '0x0000000000000000000000000000000000000000',
  USDT: process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS || '0x55d398326f99059fF775485246999027B3197955',
  USDC: process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS || '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
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

// Mock data for presale (replace with real contract calls when contracts are deployed)
export const usePresaleData = () => {
  const { presaleContract } = useContracts();
  const { chainId } = useWallet();

  return useQuery({
    queryKey: ['presaleData', chainId],
    queryFn: async () => {
      // Mock data - replace with actual contract calls
      return {
        price: '0.063',
        totalSold: '142700000',
        totalRaised: '1340000',
        phase: 1,
        isActive: true,
        timeLeft: 23068800 // 267 days in seconds
      };
    },
    enabled: true,
    refetchInterval: 10000,
  });
};

export const useBuyTokens = () => {
  const { presaleContract } = useContracts();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ amount, paymentToken }: { amount: string; paymentToken: string }) => {
      if (!presaleContract) throw new Error('Contract not initialized');
      
      // Mock transaction - replace with actual contract call
      console.log(`Buying ${amount} tokens with ${paymentToken}`);
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return { hash: '0x1234567890abcdef', success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presaleData'] });
    },
  });
};

export const useTokenBalance = (address: string) => {
  const { tokenContract } = useContracts();
  const { chainId } = useWallet();

  return useQuery({
    queryKey: ['tokenBalance', address, chainId],
    queryFn: async () => {
      // Mock balance - replace with actual contract call
      return '0';
    },
    enabled: !!address,
    refetchInterval: 10000,
  });
};
