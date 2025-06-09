
const PresaleCard = () => {
  return (
    <div className="bg-antix-dark/80 backdrop-blur-sm p-6 rounded-lg neon-border max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">$ANTIX Presale</h3>
        <div className="text-antix-grey mb-4">
          Current Price: <span className="text-antix-neon font-bold">$0.063</span>
        </div>
        <div className="text-antix-grey mb-4">
          Listing Price: <span className="text-white font-bold">$0.14</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-antix-grey mb-2">
          <span>USD Raised</span>
          <span>$0 / $2,000,000</span>
        </div>
        <div className="w-full bg-antix-dark rounded-full h-2">
          <div className="bg-antix-neon h-2 rounded-full" style={{ width: '0%' }}></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        {['ETH', 'BNB', 'USDT', 'USDC'].map((token) => (
          <div key={token} className="neon-border p-2 text-center text-sm rounded-full hover:bg-antix-neon/10 transition-colors cursor-pointer">
            {token}
          </div>
        ))}
      </div>

      <button className="w-full neon-button">
        Join Presale
      </button>
    </div>
  );
};

export default PresaleCard;
