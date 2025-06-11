import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { Core } from '@walletconnect/core';
import { WalletKit, WalletKitTypes } from '@reown/walletkit';
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils';
import { toast } from 'react-hot-toast';

interface WalletKitContextType {
  walletKit: WalletKit | null;
  isInitialized: boolean;
  error: Error | null;
  connect: (uri: string) => Promise<void>;
  disconnect: () => Promise<void>;
  getActiveSessions: () => WalletKitTypes.Session[];
}

const WalletKitContext = createContext<WalletKitContextType | null>(null);

export const useWalletKit = () => {
  const context = useContext(WalletKitContext);
  if (!context) {
    throw new Error('useWalletKit must be used within a WalletKitProvider');
  }
  return context;
};

export default function WalletKitProvider({ children }: { children: React.ReactNode }) {
  const [walletKit, setWalletKit] = useState<WalletKit | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initializeWalletKit = useCallback(async () => {
    try {
      const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
      if (!projectId) {
        throw new Error('VITE_WALLETCONNECT_PROJECT_ID is not defined');
      }

      const core = new Core({ projectId });
      const kit = await WalletKit.init({
        core,
        metadata: {
          name: 'Solar Crowdin',
          description: 'Decentralized platform for solar energy investment and trading',
          url: 'https://solarcrowdin.com',
          icons: ['https://solarcrowdin.com/icon.png'],
          redirect: { native: 'solarcrowdin://' },
        },
      });

      kit.on('session_proposal', async (proposal) => {
        try {
          const approvedNamespaces = buildApprovedNamespaces({
            proposal: proposal.params,
            supportedNamespaces: {
              eip155: {
                chains: ['eip155:1', 'eip155:137'],
                methods: [
                  'eth_sendTransaction',
                  'personal_sign',
                  'eth_signTypedData',
                  'eth_signTypedData_v4',
                  'wallet_switchEthereumChain',
                  'wallet_addEthereumChain'
                ],
                events: ['accountsChanged', 'chainChanged', 'disconnect'],
                accounts: [
                  'eip155:1:0xYourAddress',
                  'eip155:137:0xYourAddress'
                ]
              }
            }
          });

          await kit.approveSession({
            id: proposal.id,
            namespaces: approvedNamespaces
          });
          toast.success('Session approved successfully');
        } catch (error) {
          console.error('Session proposal error:', error);
          await kit.rejectSession({
            id: proposal.id,
            reason: getSdkError('USER_REJECTED')
          });
          toast.error('Session rejected');
        }
      });

      kit.on('session_request', async (event) => {
        try {
          const { topic, params, id } = event;
          const { request } = params;

          // Handle different request methods
          switch (request.method) {
            case 'personal_sign':
              // Implement personal sign logic
              break;
            case 'eth_sendTransaction':
              // Implement transaction logic
              break;
            case 'eth_signTypedData':
            case 'eth_signTypedData_v4':
              // Implement typed data signing logic
              break;
            default:
              throw new Error(`Unsupported method: ${request.method}`);
          }

          await kit.respondSessionRequest({
            topic,
            response: { id, result: 'yourResult', jsonrpc: '2.0' }
          });
        } catch (error) {
          console.error('Session request error:', error);
          await kit.respondSessionRequest({
            topic: event.topic,
            response: {
              id: event.id,
              jsonrpc: '2.0',
              error: {
                code: 5000,
                message: error instanceof Error ? error.message : 'Unknown error'
              }
            }
          });
          toast.error('Request failed');
        }
      });

      kit.on('session_delete', () => {
        toast.info('Session disconnected');
      });

      setWalletKit(kit);
      setIsInitialized(true);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize WalletKit'));
      toast.error('Failed to initialize wallet connection');
    }
  }, []);

  useEffect(() => {
    initializeWalletKit();
    return () => {
      if (walletKit) {
        walletKit.removeAllListeners();
      }
    };
  }, [initializeWalletKit]);

  const connect = useCallback(async (uri: string) => {
    if (!walletKit) {
      throw new Error('WalletKit not initialized');
    }
    try {
      await walletKit.pair({ uri });
      toast.success('Connected successfully');
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect');
      throw error;
    }
  }, [walletKit]);

  const disconnect = useCallback(async () => {
    if (!walletKit) return;
    try {
      const sessions = walletKit.getActiveSessions();
      await Promise.all(
        Object.values(sessions).map(session =>
          walletKit.disconnectSession({
            topic: session.topic,
            reason: getSdkError('USER_DISCONNECTED')
          })
        )
      );
      toast.success('Disconnected successfully');
    } catch (error) {
      console.error('Disconnection error:', error);
      toast.error('Failed to disconnect');
    }
  }, [walletKit]);

  const getActiveSessions = useCallback(() => {
    if (!walletKit) return [];
    return Object.values(walletKit.getActiveSessions());
  }, [walletKit]);

  const value = {
    walletKit,
    isInitialized,
    error,
    connect,
    disconnect,
    getActiveSessions
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">
          <h2 className="text-xl font-bold">Error</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <WalletKitContext.Provider value={value}>
      {children}
    </WalletKitContext.Provider>
  );
} 