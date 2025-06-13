
import { useWallet } from '../lib/wallets';
import { useState } from 'react';

const WalletConnect = () => {
  const { address, isConnecting, connect, disconnect, error } = useWallet();
  const [showModal, setShowModal] = useState(false);

  const isConnected = !!address;

  const handleConnect = async (walletType: any) => {
    try {
      await connect(walletType);
      setShowModal(false);
    } catch (err) {
      console.error('Failed to connect wallet:', err);
    }
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-solar-warm-white text-sm">
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </span>
        <button
          onClick={disconnect}
          className="solar-button text-sm"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={isConnecting}
        className="solar-button"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-solar-dark p-8 rounded-lg max-w-md w-full mx-4 starburst-border">
            <h3 className="text-xl font-bold text-solar-warm-white mb-6">Connect Wallet</h3>
            
            <div className="space-y-4">
              <button
                onClick={() => handleConnect('metamask')}
                className="w-full p-4 bg-solar-navy/50 hover:bg-solar-orange/10 rounded-lg text-solar-warm-white transition-colors duration-300"
              >
                🦊 MetaMask
              </button>
              <button
                onClick={() => handleConnect('trust')}
                className="w-full p-4 bg-solar-navy/50 hover:bg-solar-orange/10 rounded-lg text-solar-warm-white transition-colors duration-300"
              >
                🛡️ Trust Wallet
              </button>
              <button
                onClick={() => handleConnect('coinbase')}
                className="w-full p-4 bg-solar-navy/50 hover:bg-solar-orange/10 rounded-lg text-solar-warm-white transition-colors duration-300"
              >
                🔷 Coinbase Wallet
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-4">{error}</p>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full p-2 text-solar-grey hover:text-solar-warm-white transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnect;
