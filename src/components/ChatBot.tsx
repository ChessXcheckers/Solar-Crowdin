
import { useState } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm SolarBot ☀️ How can I help you with the $SOLAR presale?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { text: inputValue, isBot: false }]);
    
    // Simulate bot response with more relevant answers
    setTimeout(() => {
      const responses = [
        "The $SOLAR presale is currently in Phase 1 at $0.063 per token. The listing price will be $0.14, offering a 122% potential gain! 🚀",
        "You can purchase $SOLAR tokens using MATIC, USDT, or USDC. Simply connect your wallet and choose your payment method. ☀️",
        "Our solar AI technology uses machine learning to optimize energy production and distribution in real-time. 🧠",
        "The current presale has raised over $1.34M with 142.7M tokens sold. Join over 2,800 active investors! 💰",
        "Token vesting starts after TGE (Token Generation Event) scheduled for Q1 2025, with a 6-month gradual release. 📅",
        "Our smart contract will be fully audited before launch. You can view the contract address once it's deployed. 🔒"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
    }, 1000);

    setInputValue('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="starburst-border rounded-lg w-80 h-96 cosmic-glow">
          <div className="bg-solar-dark rounded-lg h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-solar-navy">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-solar-gold to-solar-orange rounded-full flex items-center justify-center text-sm animate-starburst">
                  ☀️
                </div>
                <span className="font-semibold text-solar-warm-white">SolarBot AI</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-solar-grey hover:text-solar-gold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.isBot 
                      ? 'bg-solar-navy text-solar-warm-white starburst-border' 
                      : 'bg-solar-orange text-solar-warm-white'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-solar-navy">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about $SOLAR..."
                  className="flex-1 bg-solar-navy border border-solar-gold rounded-lg px-3 py-2 text-solar-warm-white placeholder-solar-grey focus:outline-none focus:ring-2 focus:ring-solar-gold"
                />
                <button 
                  onClick={handleSendMessage}
                  className="solar-button px-3 py-2 cosmic-glow"
                >
                  🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="solar-button w-16 h-16 rounded-full cosmic-glow flex items-center justify-center text-2xl animate-starburst"
        >
          ☀️
        </button>
      )}
    </div>
  );
};

export default ChatBot;
