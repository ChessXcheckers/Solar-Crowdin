
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletState {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  walletType: string | null;
  error: string | null;
  chainId?: number;
}

interface WalletContextType extends WalletState {
  connect: (walletType: string) => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWalletKit = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletKit must be used within WalletKitProvider');
  }
  return context;
};

interface WalletKitProviderProps {
  children: React.ReactNode;
}

const WalletKitProvider: React.FC<WalletKitProviderProps> = ({ children }) => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnecting: false,
    isConnected: false,
    walletType: null,
    error: null,
    chainId: undefined
  });

  const connect = async (walletType: string) => {
    setWalletState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (accounts.length > 0) {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setWalletState({
            address: accounts[0],
            isConnecting: false,
            isConnected: true,
            walletType,
            error: null,
            chainId: parseInt(chainId, 16)
          });
          
          toast.success('Wallet connected successfully!');
        }
      } else {
        throw new Error('MetaMask is not installed');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to connect wallet';
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
      chainId: undefined
    });
    toast.success('Wallet disconnected');
  };

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          });
          
          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            setWalletState(prev => ({
              ...prev,
              address: accounts[0],
              isConnected: true,
              walletType: 'metamask',
              chainId: parseInt(chainId, 16)
            }));
          }
        } catch (error) {
          console.error('Failed to check wallet connection:', error);
        }
      }
    };

    checkConnection();

    // Listen for account changes
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
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return (
    <WalletContext.Provider value={{ ...walletState, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletKitProvider;
