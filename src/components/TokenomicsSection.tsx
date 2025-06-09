
const TokenomicsSection = () => {
  const tokenInfo = [
    { label: "Total Supply", value: "1,000,000,000 $SOLAR", icon: "☀️" },
    { label: "Ticker", value: "$SOLAR", icon: "🏷️" },
    { label: "Blockchain", value: "Ethereum (ETH)", icon: "⛓️" },
    { label: "Current Price", value: "$0.063", icon: "💰" },
    { label: "Listing Price", value: "$0.14", icon: "🚀" },
    { label: "Market Cap", value: "TBA", icon: "📊" }
  ];

  return (
    <section id="tokenomics" className="section-spacing starburst-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-solar-warm-white">
          Tokenomics
        </h2>
        
        <div className="starburst-border rounded-lg">
          <div className="bg-solar-dark/90 card-spacing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tokenInfo.map((info, index) => (
                <div key={index} className="starburst-border rounded-lg">
                  <div className="bg-solar-navy/50 p-4 rounded-lg hover:bg-solar-orange/10 transition-all duration-300 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl group-hover:animate-starburst">{info.icon}</span>
                        <span className="text-solar-grey">{info.label}:</span>
                      </div>
                      <span className="nebulae-text font-semibold text-right">{info.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button className="solar-button">
                📋 View Smart Contract
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
