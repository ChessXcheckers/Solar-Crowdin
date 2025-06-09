
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
    
    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Thanks for your question! The $SOLAR presale runs until September 10, 2025. 🚀",
        "You can purchase $SOLAR tokens using ETH, BNB, USDT, or USDC. ☀️",
        "Our solar AI technology uses machine learning to optimize energy production. 🧠",
        "The current price is $0.063, with a listing price of $0.14. 💰"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
    }, 1000);

    setInputValue('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="starburst-border rounded-lg w-80 h-96">
          <div className="bg-solar-dark rounded-lg h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-solar-navy">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-solar-gold to-solar-orange rounded-full flex items-center justify-center text-sm">
                  ☀️
                </div>
                <span className="font-semibold text-solar-warm-white">SolarBot</span>
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
                      ? 'bg-solar-navy text-solar-warm-white' 
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
                  className="solar-button px-3 py-2"
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
          className="solar-button w-14 h-14 rounded-full cosmic-glow flex items-center justify-center text-2xl"
        >
          ☀️
        </button>
      )}
    </div>
  );
};

export default ChatBot;
