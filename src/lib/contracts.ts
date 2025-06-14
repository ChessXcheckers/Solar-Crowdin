
import { useQuery } from '@tanstack/react-query';

// Mock data for when APIs fail
const MOCK_PRESALE_DATA = {
  price: '0.01',
  raised: '2500000',
  target: '5000000',
  progress: 50,
  timeLeft: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};

const MOCK_MARKET_DATA = {
  eth: 2500,
  bnb: 600,
  usdt: 1,
  usdc: 1,
};

// Add error logging
const logError = (context: string, error: any) => {
  console.error(`Error in ${context}:`, error);
};

export const usePresaleData = () => {
  return useQuery({
    queryKey: ['presaleData'],
    queryFn: async () => {
      try {
        console.log('Fetching presale data...');
        // Return mock data for now to prevent crashes
        return MOCK_PRESALE_DATA;
      } catch (error) {
        logError('usePresaleData', error);
        return MOCK_PRESALE_DATA;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    meta: {
      onError: (error: any) => logError('usePresaleData query', error),
    },
  });
};

export const useMarketData = () => {
  return useQuery({
    queryKey: ['marketData'],
    queryFn: async () => {
      try {
        console.log('Fetching market data...');
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin,ethereum,tether,usd-coin&vs_currencies=usd'
        );
        
        if (!response.ok) {
          console.warn('CoinGecko API failed, using mock data');
          return MOCK_MARKET_DATA;
        }
        
        const data = await response.json();
        console.log('Market data fetched successfully:', data);
        
        return {
          eth: data.ethereum?.usd || MOCK_MARKET_DATA.eth,
          bnb: data.binancecoin?.usd || MOCK_MARKET_DATA.bnb,
          usdt: data.tether?.usd || MOCK_MARKET_DATA.usdt,
          usdc: data['usd-coin']?.usd || MOCK_MARKET_DATA.usdc,
        };
      } catch (error) {
        logError('useMarketData', error);
        return MOCK_MARKET_DATA;
      }
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: 1,
    meta: {
      onError: (error: any) => logError('useMarketData query', error),
    },
  });
};

export const useBuyTokens = () => {
  return {
    mutateAsync: async ({ amount, paymentToken }: { amount: string; paymentToken: string }) => {
      try {
        console.log(`Mock buying ${amount} tokens with ${paymentToken}`);
        // Mock implementation for now
        return { success: true };
      } catch (error) {
        logError('useBuyTokens', error);
        throw error;
      }
    },
    isPending: false,
  };
};
