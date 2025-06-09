
const TokenomicsSection = () => {
  const tokenInfo = [
    { label: "Total Supply", value: "1,000,000,000 $ANTIX" },
    { label: "Ticker", value: "$ANTIX" },
    { label: "Blockchain", value: "Ethereum (ETH)" },
    { label: "Current Price", value: "$0.063" },
    { label: "Listing Price", value: "$0.14" },
    { label: "Market Cap", value: "TBA" }
  ];

  return (
    <section id="tokenomics" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Tokenomics
        </h2>
        
        <div className="bg-antix-dark/50 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tokenInfo.map((info, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-antix-navy/50 rounded-lg">
                <span className="text-antix-grey">{info.label}:</span>
                <span className="text-antix-neon font-semibold">{info.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
