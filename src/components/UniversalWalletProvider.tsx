import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';

declare global {
  interface Window {
    ethereum?: any;
    trustWallet?: any;
    coinbaseWalletExtension?: any;
    solana?: any;
  }
}

export interface WalletState {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  walletType: string | null;
  error: string | null;
  chainId?: number;
  balance?: string;
}

interface WalletContextType extends WalletState {
  connect: (walletType: WalletType) => Promise<void>;
  disconnect: () => Promise<void>;
  switchNetwork: (chainId: number) => Promise<void>;
  getSupportedWallets: () => WalletInfo[];
  refreshBalance: () => Promise<void>;
}

export type WalletType = 'metamask' | 'trust' | 'coinbase' | 'walletconnect' | 'phantom' | 'binance';

export interface WalletInfo {
  id: WalletType;
  name: string;
  icon: string;
  description: string;
  downloadUrl?: string;
  isInstalled: boolean;
  isSupported: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useUniversalWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useUniversalWallet must be used within UniversalWalletProvider');
  }
  return context;
};

const UniversalWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnecting: false,
    isConnected: false,
    walletType: null,
    error: null,
    chainId: undefined,
    balance: undefined
  });

  const detectWalletInstallation = useCallback(() => {
    return {
      metamask: typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask,
      trust: typeof window.ethereum !== 'undefined' && window.ethereum.isTrust,
      coinbase: typeof window.ethereum !== 'undefined' && (window.ethereum.isCoinbaseWallet || window.coinbaseWalletExtension),
      phantom: typeof window.solana !== 'undefined' && window.solana.isPhantom,
      binance: typeof window.ethereum !== 'undefined' && window.ethereum.isBinance,
      walletconnect: true // Always available as it's a protocol
    };
  }, []);

  const getSupportedWallets = useCallback((): WalletInfo[] => {
    const installed = detectWalletInstallation();
    
    return [
      {
        id: 'metamask',
        name: 'MetaMask',
        icon: '🦊',
        description: 'Most popular Ethereum wallet',
        downloadUrl: 'https://metamask.io/download/',
        isInstalled: installed.metamask,
        isSupported: true
      },
      {
        id: 'trust',
        name: 'Trust Wallet',
        icon: '🛡️',
        description: 'Mobile-first crypto wallet',
        downloadUrl: 'https://trustwallet.com/',
        isInstalled: installed.trust,
        isSupported: true
      },
      {
        id: 'coinbase',
        name: 'Coinbase Wallet',
        icon: '🔷',
        description: 'Self-custody wallet by Coinbase',
        downloadUrl: 'https://www.coinbase.com/wallet',
        isInstalled: installed.coinbase,
        isSupported: true
      },
      {
        id: 'binance',
        name: 'Binance Wallet',
        icon: '🟡',
        description: 'Official Binance crypto wallet',
        downloadUrl: 'https://www.binance.org/en/binance-wallet',
        isInstalled: installed.binance,
        isSupported: true
      },
      {
        id: 'phantom',
        name: 'Phantom',
        icon: '👻',
        description: 'Solana and multi-chain wallet',
        downloadUrl: 'https://phantom.app/',
        isInstalled: installed.phantom,
        isSupported: true
      },
      {
        id: 'walletconnect',
        name: 'WalletConnect',
        icon: '🔗',
        description: 'Connect any wallet via QR code',
        isInstalled: true,
        isSupported: true
      }
    ];
  }, [detectWalletInstallation]);

  const getBalance = async (address: string, chainId: number): Promise<string> => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        });
        const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
        return balanceInEth.toFixed(4);
      }
      return '0.0000';
    } catch (error) {
      console.error('Error fetching balance:', error);
      return '0.0000';
    }
  };

  const refreshBalance = async () => {
    if (walletState.address && walletState.chainId) {
      const balance = await getBalance(walletState.address, walletState.chainId);
      setWalletState(prev => ({ ...prev, balance }));
    }
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed. Please install it from metamask.io');
    }

    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (accounts.length > 0) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const numericChainId = parseInt(chainId, 16);
      const balance = await getBalance(accounts[0], numericChainId);
      
      return {
        address: accounts[0],
        chainId: numericChainId,
        balance
      };
    }
    throw new Error('No accounts found');
  };

  const connectTrustWallet = async () => {
    if (typeof window.ethereum === 'undefined' || !window.ethereum.isTrust) {
      throw new Error('Trust Wallet is not installed. Please install it from trustwallet.com');
    }

    return await connectMetaMask(); // Trust Wallet uses same interface as MetaMask
  };

  const connectCoinbaseWallet = async () => {
    if (typeof window.ethereum === 'undefined' || (!window.ethereum.isCoinbaseWallet && !window.coinbaseWalletExtension)) {
      throw new Error('Coinbase Wallet is not installed. Please install it from coinbase.com/wallet');
    }

    return await connectMetaMask(); // Coinbase Wallet uses same interface
  };

  const connectBinanceWallet = async () => {
    if (typeof window.ethereum === 'undefined' || !window.ethereum.isBinance) {
      throw new Error('Binance Wallet is not installed. Please install it from binance.org');
    }

    return await connectMetaMask(); // Binance Wallet uses same interface
  };

  const connectPhantom = async () => {
    if (typeof window.solana === 'undefined' || !window.solana.isPhantom) {
      throw new Error('Phantom Wallet is not installed. Please install it from phantom.app');
    }

    const response = await window.solana.connect();
    return {
      address: response.publicKey.toString(),
      chainId: 101, // Solana mainnet
      balance: '0.0000' // Would need Solana RPC to get actual balance
    };
  };

  const connectWalletConnect = async () => {
    // For now, fallback to MetaMask if available
    if (typeof window.ethereum !== 'undefined') {
      return await connectMetaMask();
    }
    throw new Error('WalletConnect integration coming soon. Please use a browser wallet for now.');
  };

  const connect = async (walletType: WalletType) => {
    setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      let result;
      
      switch (walletType) {
        case 'metamask':
          result = await connectMetaMask();
          break;
        case 'trust':
          result = await connectTrustWallet();
          break;
        case 'coinbase':
          result = await connectCoinbaseWallet();
          break;
        case 'binance':
          result = await connectBinanceWallet();
          break;
        case 'phantom':
          result = await connectPhantom();
          break;
        case 'walletconnect':
          result = await connectWalletConnect();
          break;
        default:
          throw new Error(`Unsupported wallet type: ${walletType}`);
      }

      setWalletState({
        address: result.address,
        isConnecting: false,
        isConnected: true,
        walletType,
        error: null,
        chainId: result.chainId,
        balance: result.balance
      });

      toast.success(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} connected successfully!`);
    } catch (error: any) {
      const errorMessage = error.message || `Failed to connect ${walletType}`;
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: errorMessage
      }));
      toast.error(errorMessage);
      throw error;
    }
  };

  const disconnect = async () => {
    setWalletState({
      address: null,
      isConnecting: false,
      isConnected: false,
      walletType: null,
      error: null,
      chainId: undefined,
      balance: undefined
    });
    toast.success('Wallet disconnected');
  };

  const switchNetwork = async (targetChainId: number) => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('No wallet connected');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
      
      setWalletState(prev => ({ ...prev, chainId: targetChainId }));
      await refreshBalance();
      toast.success('Network switched successfully');
    } catch (error: any) {
      toast.error(`Failed to switch network: ${error.message}`);
      throw error;
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          });
          
          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            const numericChainId = parseInt(chainId, 16);
            const balance = await getBalance(accounts[0], numericChainId);
            
            // Detect wallet type
            let walletType: WalletType = 'metamask';
            if (window.ethereum.isTrust) walletType = 'trust';
            else if (window.ethereum.isCoinbaseWallet) walletType = 'coinbase';
            else if (window.ethereum.isBinance) walletType = 'binance';
            
            setWalletState({
              address: accounts[0],
              isConnecting: false,
              isConnected: true,
              walletType,
              error: null,
              chainId: numericChainId,
              balance
            });
          }
        } catch (error) {
          console.error('Failed to check wallet connection:', error);
        }
      }
    };

    checkConnection();

    // Listen for account and chain changes
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          setWalletState(prev => ({
            ...prev,
            address: accounts[0],
            isConnected: true
          }));
          refreshBalance();
        }
      };

      const handleChainChanged = (chainId: string) => {
        const numericChainId = parseInt(chainId, 16);
        setWalletState(prev => ({ ...prev, chainId: numericChainId }));
        refreshBalance();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  return (
    <WalletContext.Provider value={{ 
      ...walletState, 
      connect, 
      disconnect, 
      switchNetwork, 
      getSupportedWallets, 
      refreshBalance 
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export default UniversalWalletProvider;