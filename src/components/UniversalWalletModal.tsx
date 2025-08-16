import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUniversalWallet, WalletType, WalletInfo } from './UniversalWalletProvider';
import { FiX, FiCreditCard, FiDownload, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

interface UniversalWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UniversalWalletModal: React.FC<UniversalWalletModalProps> = ({ isOpen, onClose }) => {
  const { connect, isConnecting, error, getSupportedWallets } = useUniversalWallet();
  const [selectedWallet, setSelectedWallet] = useState<WalletType | null>(null);

  const supportedWallets = getSupportedWallets();

  const handleConnect = async (walletType: WalletType, wallet: WalletInfo) => {
    if (!wallet.isInstalled && wallet.downloadUrl) {
      window.open(wallet.downloadUrl, '_blank');
      return;
    }

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

  const getWalletStatusIcon = (wallet: WalletInfo) => {
    if (wallet.isInstalled) {
      return <FiCheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <FiDownload className="w-4 h-4 text-orange-500" />;
  };

  const getButtonText = (wallet: WalletInfo) => {
    if (!wallet.isInstalled) return 'Install';
    if (isConnecting && selectedWallet === wallet.id) return 'Connecting...';
    return 'Connect';
  };

  const getButtonClass = (wallet: WalletInfo) => {
    const baseClass = "w-full p-4 border-2 rounded-xl transition-all duration-200 group disabled:cursor-not-allowed";
    
    if (!wallet.isInstalled) {
      return `${baseClass} border-orange-200 hover:border-orange-300 hover:bg-orange-50`;
    }
    
    if (isConnecting && selectedWallet === wallet.id) {
      return `${baseClass} border-orange-400 bg-orange-50 opacity-75`;
    }
    
    return `${baseClass} border-gray-200 hover:border-orange-300 hover:bg-orange-50`;
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
              <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
                {supportedWallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleConnect(wallet.id, wallet)}
                    disabled={isConnecting && selectedWallet !== null}
                    className={getButtonClass(wallet)}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{wallet.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {wallet.name}
                          </h3>
                          {getWalletStatusIcon(wallet)}
                        </div>
                        <p className="text-sm text-gray-600">{wallet.description}</p>
                        {!wallet.isInstalled && (
                          <p className="text-xs text-orange-600 mt-1">Click to install</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {isConnecting && selectedWallet === wallet.id && (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-600"></div>
                        )}
                        <span className="text-sm text-gray-500">
                          {getButtonText(wallet)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mx-6 mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                  <FiAlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-600 text-sm font-medium">Connection Error</p>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <FiCheckCircle className="w-3 h-3" />
                  <span>Secure connection • Your keys, your crypto</span>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
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

export default UniversalWalletModal;