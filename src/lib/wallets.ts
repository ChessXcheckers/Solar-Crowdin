// Simple wallet utilities for presale card
export const useWallet = () => {
  return {
    address: null,
    connect: async (walletType: string) => {
      console.log(`Connecting to ${walletType}...`);
      // This will be replaced by your UniversalWalletProvider
    }
  };
};