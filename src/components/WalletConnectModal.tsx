import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../lib/wallets';
import { FiX, FiCreditCard } from 'react-icons/fi';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({ isOpen, onClose }) => {
  const { connect, isConnecting, error } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const wallets = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      description: 'Connect with MetaMask wallet'
    },
    {
      id: 'trust',
      name: 'Trust Wallet',
      icon: '🛡️',
      description: 'Connect with Trust Wallet'
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: '🔷',
      description: 'Connect with Coinbase Wallet'
    }
  ];

  const handleConnect = async (walletType: string) => {
    setSelectedWallet(walletType);
    try {
      await connect(walletType);
      onClose();
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    } finally {
      setSelectedWallet(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FiCreditCard size={24} />
                    <h2 className="text-xl font-bold">Connect Wallet</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                <p className="text-orange-100 mt-2">
                  Choose your preferred wallet to connect to SolarCrowdin
                </p>
              </div>

              {/* Wallet Options */}
              <div className="p-6 space-y-3">
                {wallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleConnect(wallet.id)}
                    disabled={isConnecting && selectedWallet === wallet.id}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{wallet.icon}</span>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {wallet.name}
                        </h3>
                        <p className="text-sm text-gray-600">{wallet.description}</p>
                      </div>
                      {isConnecting && selectedWallet === wallet.id && (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-600"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mx-6 mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4">
                <p className="text-xs text-gray-500 text-center">
                  By connecting a wallet, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WalletConnectModal;