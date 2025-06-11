import { ethers } from 'ethers';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Single Responsibility Principle: Separate interfaces for different concerns
export type WalletType = 'metamask' | 'phantom' | 'trust' | 'coinbase' | 'walletconnect';

interface IWalletProvider {
  connect: (type: WalletType) => Promise<void>;
  disconnect: () => void;
  getBalance: () => Promise<string>;
  getTokenBalance: (tokenAddress: string) => Promise<string>;
  sendTransaction: (tx: ethers.TransactionRequest) => Promise<string>;
  signMessage: (message: string) => Promise<string>;
  switchNetwork: (chainId: number) => Promise<void>;
}

interface IWalletState {
  provider: IWalletProvider | null;
  address: string | null;
  chainId: number | null;
  walletType: WalletType | null;
  isConnecting: boolean;
  error: string | null;
  connect: (walletType: WalletType) => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
}

// Interface Segregation: Separate error handling interface
interface IWalletErrorHandler {
  handleError: (error: unknown) => WalletError;
  isRecoverable: (error: unknown) => boolean;
}

// Open/Closed Principle: Base error class that can be extended
class WalletError extends Error {
  constructor(
    message: string,
    public code: string,
    public recoverable: boolean = true,
    public metadata?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'WalletError';
  }
}

// Dependency Inversion: Abstract factory for wallet providers
interface IWalletProviderFactory {
  createProvider: (type: WalletType) => Promise<IWalletProvider>;
}

// Concrete implementation of wallet provider factory
class WalletProviderFactory implements IWalletProviderFactory {
  async createProvider(type: WalletType): Promise<IWalletProvider> {
    switch (type) {
      case 'metamask':
        return new MetaMaskProvider();
      case 'trust':
        return new TrustWalletProvider();
      case 'coinbase':
        return new CoinbaseWalletProvider();
      case 'walletconnect':
        return new WalletConnectProvider();
      default:
        throw new WalletError('Unsupported wallet type', 'UNSUPPORTED_WALLET');
    }
  }
}

// Base provider class implementing common functionality
abstract class BaseWalletProvider implements IWalletProvider {
  protected provider: ethers.BrowserProvider | null = null;
  protected signer: ethers.Signer | null = null;
  protected type: WalletType | null = null;
  protected errorHandler: IWalletErrorHandler;

  constructor(errorHandler: IWalletErrorHandler) {
    this.errorHandler = errorHandler;
  }

  abstract connect(type: WalletType): Promise<void>;
  
  disconnect() {
    this.provider = null;
    this.signer = null;
    this.type = null;
  }

  async getBalance(): Promise<string> {
    try {
      if (!this.signer) throw new Error('Wallet not connected');
      const balance = await this.signer.getBalance();
      return ethers.formatEther(balance);
    } catch (error) {
      throw this.errorHandler.handleError(error);
    }
  }

  async getTokenBalance(tokenAddress: string): Promise<string> {
    try {
      if (!this.signer) throw new Error('Wallet not connected');
      const contract = new ethers.Contract(
        tokenAddress,
        ['function balanceOf(address) view returns (uint256)'],
        this.signer
      );
      const balance = await contract.balanceOf(await this.signer.getAddress());
      return ethers.formatEther(balance);
    } catch (error) {
      throw this.errorHandler.handleError(error);
    }
  }

  async sendTransaction(tx: ethers.TransactionRequest): Promise<string> {
    try {
      if (!this.signer) throw new Error('Wallet not connected');
      const response = await this.signer.sendTransaction(tx);
      return response.hash;
    } catch (error) {
      throw this.errorHandler.handleError(error);
    }
  }

  async signMessage(message: string): Promise<string> {
    try {
      if (!this.signer) throw new Error('Wallet not connected');
      return this.signer.signMessage(message);
    } catch (error) {
      throw this.errorHandler.handleError(error);
    }
  }

  async switchNetwork(chainId: number): Promise<void> {
    try {
      if (!window.ethereum) throw new Error('No wallet provider found');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }]
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('does not exist')) {
        await this.addNetwork(chainId);
      } else {
        throw this.errorHandler.handleError(error);
      }
    }
  }

  protected async addNetwork(chainId: number): Promise<void> {
    try {
      if (!window.ethereum) throw new Error('No wallet provider found');
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${chainId.toString(16)}`,
          chainName: chainId === 97 ? 'BSC Testnet' : 'BSC Mainnet',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
          },
          rpcUrls: [process.env.VITE_BSC_RPC_URL!],
          blockExplorerUrls: [process.env.VITE_BSC_EXPLORER_URL!]
        }]
      });
    } catch (error) {
      throw this.errorHandler.handleError(error);
    }
  }

  protected setupEventListeners() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          this.disconnect();
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        // Handle chain change
      });
    }
  }
}

// Concrete implementations for each wallet type
class MetaMaskProvider extends BaseWalletProvider {
  async connect(type: WalletType) {
    try {
      if (!window.ethereum) throw new Error('MetaMask not installed');
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      this.type = type;
      this.setupEventListeners();
    } catch (error) {
      throw this.errorHandler.handleError(error);
    }
  }
}

class TrustWalletProvider extends BaseWalletProvider {
  async connect(type: WalletType) {
    try {
      if (!window.trustwallet) throw new Error('Trust Wallet not installed');
      this.provider = new ethers.BrowserProvider(window.trustwallet);
      this.signer = await this.provider.getSigner();
      this.type = type;
      this.setupEventListeners();
    } catch (error) {
      throw this.errorHandler.handleError(error);
    }
  }
}

class CoinbaseWalletProvider extends BaseWalletProvider {
  async connect(type: WalletType) {
    try {
      if (!window.coinbaseWalletExtension) throw new Error('Coinbase Wallet not installed');
      this.provider = new ethers.BrowserProvider(window.coinbaseWalletExtension);
      this.signer = await this.provider.getSigner();
      this.type = type;
      this.setupEventListeners();
    } catch (error) {
      throw this.errorHandler.handleError(error);
    }
  }
}

class WalletConnectProvider extends BaseWalletProvider {
  async connect(type: WalletType) {
    try {
      const { Web3Modal } = await import('@web3modal/ethereum');
      const { WalletConnectConnector } = await import('@web3modal/ethereum');
      const connector = new WalletConnectConnector({
        options: { projectId: process.env.VITE_WALLETCONNECT_PROJECT_ID! }
      });
      this.provider = new ethers.BrowserProvider(await connector.getProvider());
      this.signer = await this.provider.getSigner();
      this.type = type;
      this.setupEventListeners();
    } catch (error) {
      throw this.errorHandler.handleError(error);
    }
  }
}

// Error handler implementation
class WalletErrorHandler implements IWalletErrorHandler {
  handleError(error: unknown): WalletError {
    if (error instanceof WalletError) return error;
    
    if (error instanceof Error) {
      return new WalletError(
        error.message,
        this.getErrorCode(error),
        this.isRecoverable(error)
      );
    }
    
    return new WalletError(
      'An unknown error occurred',
      'UNKNOWN_ERROR',
      false
    );
  }

  isRecoverable(error: unknown): boolean {
    if (error instanceof WalletError) return error.recoverable;
    
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      return !message.includes('user rejected') && 
             !message.includes('user denied') &&
             !message.includes('cancelled');
    }
    
    return false;
  }

  private getErrorCode(error: Error): string {
    const message = error.message.toLowerCase();
    if (message.includes('not installed')) return 'WALLET_NOT_FOUND';
    if (message.includes('user rejected')) return 'USER_REJECTED';
    if (message.includes('network')) return 'NETWORK_ERROR';
    if (message.includes('transaction')) return 'TRANSACTION_ERROR';
    return 'UNKNOWN_ERROR';
  }
}

// State management with Zustand
export const useWallet = create<IWalletState>()(
  persist(
    (set, get) => ({
      provider: null,
      address: null,
      chainId: null,
      walletType: null,
      isConnecting: false,
      error: null,

      connect: async (walletType: WalletType) => {
        try {
          set({ isConnecting: true, error: null });
          const factory = new WalletProviderFactory();
          const provider = await factory.createProvider(walletType);
          await provider.connect(walletType);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const network = await provider.getNetwork();
          
          set({
            provider,
            address,
            chainId: Number(network.chainId),
            walletType,
            isConnecting: false
          });
        } catch (error) {
          const errorHandler = new WalletErrorHandler();
          const walletError = errorHandler.handleError(error);
          set({
            error: walletError.message,
            isConnecting: false
          });
        }
      },

      disconnect: () => {
        const { provider } = get();
        if (provider) {
          provider.disconnect();
        }
        set({
          provider: null,
          address: null,
          chainId: null,
          walletType: null,
          error: null
        });
      },

      switchNetwork: async (chainId: number) => {
        const { provider } = get();
        if (!provider) throw new Error('No wallet provider found');
        await provider.switchNetwork(chainId);
        set({ chainId });
      }
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        walletType: state.walletType,
        chainId: state.chainId
      })
    }
  )
); 