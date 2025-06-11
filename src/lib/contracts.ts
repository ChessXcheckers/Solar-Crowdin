import { ethers } from 'ethers';
import { useWallet } from './wallets';
import { create } from 'zustand';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Contract ABIs
import PresaleABI from '../contracts/Presale.json';
import TokenABI from '../contracts/Token.json';

const CONTRACT_ADDRESSES = {
  PRESALE: process.env.VITE_PRESALE_ADDRESS!,
  TOKEN: process.env.VITE_TOKEN_ADDRESS!,
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
      PresaleABI,
      signer
    );
    const tokenContract = new ethers.Contract(
      CONTRACT_ADDRESSES.TOKEN,
      TokenABI,
      signer
    );
    set({ presaleContract, tokenContract });
  },
}));

// Presale Hooks
export const usePresaleData = () => {
  const { presaleContract } = useContracts();
  const { chainId } = useWallet();

  return useQuery({
    queryKey: ['presaleData', chainId],
    queryFn: async () => {
      if (!presaleContract) throw new Error('Contract not initialized');
      
      const [price, totalSold, totalRaised, phase] = await Promise.all([
        presaleContract.getCurrentPrice(),
        presaleContract.getTotalSold(),
        presaleContract.getTotalRaised(),
        presaleContract.getCurrentPhase(),
      ]);

      return {
        price: ethers.formatEther(price),
        totalSold: ethers.formatEther(totalSold),
        totalRaised: ethers.formatEther(totalRaised),
        phase: Number(phase),
      };
    },
    enabled: !!presaleContract,
    refetchInterval: 10000, // Update every 10 seconds
  });
};

export const useBuyTokens = () => {
  const { presaleContract } = useContracts();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount: string) => {
      if (!presaleContract) throw new Error('Contract not initialized');
      
      const tx = await presaleContract.buyTokens(ethers.parseEther(amount));
      return await tx.wait();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['presaleData'] });
    },
  });
};

// Token Hooks
export const useTokenBalance = (address: string) => {
  const { tokenContract } = useContracts();
  const { chainId } = useWallet();

  return useQuery({
    queryKey: ['tokenBalance', address, chainId],
    queryFn: async () => {
      if (!tokenContract) throw new Error('Contract not initialized');
      
      const balance = await tokenContract.balanceOf(address);
      return ethers.formatEther(balance);
    },
    enabled: !!tokenContract && !!address,
    refetchInterval: 10000,
  });
};

export const useTokenAllowance = (owner: string, spender: string) => {
  const { tokenContract } = useContracts();
  const { chainId } = useWallet();

  return useQuery({
    queryKey: ['tokenAllowance', owner, spender, chainId],
    queryFn: async () => {
      if (!tokenContract) throw new Error('Contract not initialized');
      
      const allowance = await tokenContract.allowance(owner, spender);
      return ethers.formatEther(allowance);
    },
    enabled: !!tokenContract && !!owner && !!spender,
  });
};

export const useApproveTokens = () => {
  const { tokenContract } = useContracts();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ spender, amount }: { spender: string; amount: string }) => {
      if (!tokenContract) throw new Error('Contract not initialized');
      
      const tx = await tokenContract.approve(spender, ethers.parseEther(amount));
      return await tx.wait();
    },
    onSuccess: (_, { spender }) => {
      queryClient.invalidateQueries({ 
        queryKey: ['tokenAllowance', tokenContract?.signer.address, spender] 
      });
    },
  });
}; 