import { useState } from 'react';
import { useWallet, WalletType } from '@/lib/wallets';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const WALLET_OPTIONS: { type: WalletType; name: string; icon: string }[] = [
  { type: 'metamask', name: 'MetaMask', icon: '🦊' },
  { type: 'phantom', name: 'Phantom', icon: '👻' },
  { type: 'trust', name: 'Trust Wallet', icon: '🔒' },
  { type: 'coinbase', name: 'Coinbase Wallet', icon: '💰' },
  { type: 'walletconnect', name: 'WalletConnect', icon: '🔗' },
];

const WalletConnect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address, walletType, isConnecting, error, connect, disconnect } = useWallet();
  const { toast } = useToast();

  const handleConnect = async (type: WalletType) => {
    try {
      await connect(type);
      setIsOpen(false);
      toast({
        title: 'Wallet Connected',
        description: `Successfully connected to ${type}`,
      });
    } catch (err) {
      toast({
        title: 'Connection Failed',
        description: err instanceof Error ? err.message : 'Failed to connect wallet',
        variant: 'destructive',
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: 'Wallet Disconnected',
      description: 'Successfully disconnected wallet',
    });
  };

  if (address) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-solar-grey">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <Button
          variant="outline"
          onClick={handleDisconnect}
          className="solar-button"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="solar-button cosmic-glow">
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-solar-dark border-solar-gold">
        <DialogHeader>
          <DialogTitle className="text-solar-warm-white">Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {WALLET_OPTIONS.map((wallet) => (
            <Button
              key={wallet.type}
              variant="outline"
              className="flex items-center justify-start gap-3 p-4 hover:bg-solar-navy/50 transition-colors"
              onClick={() => handleConnect(wallet.type)}
              disabled={isConnecting}
            >
              <span className="text-2xl">{wallet.icon}</span>
              <span className="text-solar-warm-white">{wallet.name}</span>
            </Button>
          ))}
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnect; 