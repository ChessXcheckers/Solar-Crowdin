import { useState, useCallback } from 'react';
import { usePresale } from '../hooks/usePresale';
import { useWallet } from '../lib/wallets';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiClock, FiDollarSign, FiPercent, FiTrendingUp } from 'react-icons/fi';
import { USDT_CONTRACT, USDC_CONTRACT } from '../constants/contracts';

export function PresaleCard() {
  const { address, connect } = useWallet();
  const {
    presaleInfo,
    loading,
    error,
    transactionStatus,
    buyTokens,
    claimTokens,
    calculatePrice,
    calculateTokens,
    formatAmount,
    formatAddress
  } = usePresale();

  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'BNB' | 'USDT' | 'USDC'>('BNB');

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  }, []);

  const handleBuy = useCallback(async () => {
    try {
      if (!address) {
        await connect();
        return;
      }

      if (!amount) {
        toast.error('Please enter an amount');
        return;
      }

      await buyTokens(amount, paymentMethod);
      setAmount('');
    } catch (err) {
      console.error('Failed to buy tokens:', err);
    }
  }, [address, amount, paymentMethod, buyTokens, connect]);

  const handleClaim = useCallback(async () => {
    try {
      if (!address) {
        await connect();
        return;
      }

      await claimTokens();
    } catch (err) {
      console.error('Failed to claim tokens:', err);
    }
  }, [address, claimTokens, connect]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (!presaleInfo) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-600">
        <p>No presale information available</p>
      </div>
    );
  }

  const progress = (parseFloat(presaleInfo.totalSold) / parseFloat(presaleInfo.currentStage.totalTokens)) * 100;
  const estimatedTokens = amount ? calculateTokens(amount, presaleInfo.currentStage, paymentMethod) : '0';
  const estimatedPrice = amount ? calculatePrice(amount, presaleInfo.currentStage, paymentMethod) : '0';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Token Presale</h2>
          {address && (
            <span className="text-sm text-gray-500">
              Connected: {formatAddress(address)}
            </span>
          )}
        </div>

        {/* Timer */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-blue-600">
            <FiClock className="w-5 h-5" />
            <span className="font-medium">Time Remaining:</span>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            <div className="text-center">
              <div className="text-2xl font-bold">{presaleInfo.timeLeft.days}</div>
              <div className="text-sm text-gray-500">Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{presaleInfo.timeLeft.hours}</div>
              <div className="text-sm text-gray-500">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{presaleInfo.timeLeft.minutes}</div>
              <div className="text-sm text-gray-500">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{presaleInfo.timeLeft.seconds}</div>
              <div className="text-sm text-gray-500">Seconds</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium">{formatAmount(progress.toString())}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-blue-500"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{formatAmount(presaleInfo.totalSold)} tokens sold</span>
            <span>{formatAmount(presaleInfo.currentStage.totalTokens)} total</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <FiDollarSign className="w-5 h-5" />
              <span className="font-medium">Total Raised</span>
            </div>
            <div className="mt-1 text-2xl font-bold">${formatAmount(presaleInfo.totalRaised)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <FiTrendingUp className="w-5 h-5" />
              <span className="font-medium">Current Price</span>
            </div>
            <div className="mt-1 text-2xl font-bold">${formatAmount(presaleInfo.currentStage.price)}</div>
          </div>
        </div>

        {/* Buy Form */}
        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setPaymentMethod('BNB')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                paymentMethod === 'BNB'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              BNB
            </button>
            <button
              onClick={() => setPaymentMethod('USDT')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                paymentMethod === 'USDT'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              USDT
            </button>
            <button
              onClick={() => setPaymentMethod('USDC')}
              className={`flex-1 py-2 px-4 rounded-lg ${
                paymentMethod === 'USDC'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              USDC
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder={`Enter ${paymentMethod} amount`}
              className="w-full py-3 px-4 pr-20 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {paymentMethod}
            </div>
          </div>

          {amount && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">You will receive:</span>
                <span className="font-medium">{formatAmount(estimatedTokens)} tokens</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Estimated value:</span>
                <span className="font-medium">${formatAmount(estimatedPrice)}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleBuy}
            disabled={!presaleInfo.isActive || transactionStatus?.status === 'pending'}
            className={`w-full py-3 px-4 rounded-lg font-medium ${
              !presaleInfo.isActive
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : transactionStatus?.status === 'pending'
                ? 'bg-blue-300 text-white cursor-wait'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {!address
              ? 'Connect Wallet'
              : transactionStatus?.status === 'pending'
              ? 'Processing...'
              : 'Buy Tokens'}
          </button>

          {presaleInfo.isClaimable && (
            <button
              onClick={handleClaim}
              disabled={transactionStatus?.status === 'pending'}
              className={`w-full py-3 px-4 rounded-lg font-medium ${
                transactionStatus?.status === 'pending'
                  ? 'bg-green-300 text-white cursor-wait'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {transactionStatus?.status === 'pending' ? 'Processing...' : 'Claim Tokens'}
            </button>
          )}
        </div>

        {/* Transaction Status */}
        {transactionStatus && (
          <div
            className={`p-4 rounded-lg ${
              transactionStatus.status === 'success'
                ? 'bg-green-50 text-green-600'
                : transactionStatus.status === 'failed'
                ? 'bg-red-50 text-red-600'
                : 'bg-blue-50 text-blue-600'
            }`}
          >
            <p className="font-medium">
              {transactionStatus.type === 'approve'
                ? 'Approving tokens...'
                : transactionStatus.type === 'buy'
                ? 'Buying tokens...'
                : 'Claiming tokens...'}
            </p>
            {transactionStatus.hash && (
              <a
                href={`https://bscscan.com/tx/${transactionStatus.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline mt-1 inline-block"
              >
                View on BscScan
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default PresaleCard;
