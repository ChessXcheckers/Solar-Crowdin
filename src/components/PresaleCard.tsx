import { useState } from 'react';
import { useWallet } from '../lib/wallets';
import { usePresaleData, useBuyTokens } from '../lib/contracts';
import toast from 'react-hot-toast';

const PresaleCard = () => {
  const [amount, setAmount] = useState('');
  const [paymentToken, setPaymentToken] = useState('ETH');
  const { address, connect } = useWallet();
  const { data: presaleData } = usePresaleData();
  const buyTokens = useBuyTokens();

  const calculateTokens = () => {
    if (!amount || !presaleData) return '0';
    const tokens = parseFloat(amount) / parseFloat(presaleData.price);
    return tokens.toLocaleString();
  };

  const handleBuy = async () => {
    if (!address) {
      await connect('metamask');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      const result = await buyTokens.mutateAsync({ amount, paymentToken });
      if (result.success) {
        toast.success('Purchase successful!');
        setAmount('');
      }
    } catch (error) {
      toast.error('Purchase failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="starburst-border rounded-lg max-w-md mx-auto">
      <div className="bg-solar-dark card-spacing">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-solar-warm-white mb-2">
            🚀 Join the Solar Revolution
          </h3>
          <p className="text-solar-grey">
            Current Price: <span className="text-solar-gold font-bold">${presaleData?.price || '0.063'}</span>
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-solar-grey text-sm mb-2">Payment Currency</label>
            <select 
              value={paymentToken}
              onChange={(e) => setPaymentToken(e.target.value)}
              className="w-full p-3 bg-solar-navy/50 border border-solar-gold/30 rounded-lg text-solar-warm-white focus:border-solar-gold focus:outline-none"
            >
              <option value="ETH">ETH</option>
              <option value="MATIC">MATIC</option>
              <option value="USDT">USDT</option>
              <option value="USDC">USDC</option>
            </select>
          </div>

          <div>
            <label className="block text-solar-grey text-sm mb-2">Amount ({paymentToken})</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="w-full p-3 bg-solar-navy/50 border border-solar-gold/30 rounded-lg text-solar-warm-white focus:border-solar-gold focus:outline-none"
            />
          </div>

          <div className="bg-solar-navy/30 p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-solar-grey">You will receive:</span>
              <span className="text-solar-gold font-bold">{calculateTokens()} $SOLAR</span>
            </div>
          </div>

          <button
            onClick={handleBuy}
            disabled={buyTokens.isPending}
            className="w-full solar-button cosmic-glow text-lg font-bold disabled:opacity-50"
          >
            {buyTokens.isPending ? '⏳ Processing...' : address ? '🚀 Buy Tokens' : '🔗 Connect Wallet'}
          </button>

          {address && (
            <div className="text-center">
              <button className="text-solar-gold hover:text-solar-orange transition-colors duration-300 text-sm">
                📊 View Transaction History
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-solar-gold/20">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-solar-grey">Tokens Sold</div>
              <div className="text-solar-gold font-bold">
                {presaleData?.totalSold ? `${(parseInt(presaleData.totalSold) / 1000000).toFixed(1)}M` : '142.7M'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-solar-grey">Raised</div>
              <div className="text-solar-gold font-bold">
                ${presaleData?.totalRaised ? `${(parseInt(presaleData.totalRaised) / 1000000).toFixed(2)}M` : '8.99M'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresaleCard;
