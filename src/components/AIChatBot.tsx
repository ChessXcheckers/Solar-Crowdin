
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm SolarBot ☀️ Your AI assistant for SolarCrowdin. How can I help you with the SLC presale?", 
      isBot: true 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "The SLC token presale is currently priced at $0.063 per token. After listing, the price will be $0.14, offering potential gains of 122%! 🚀";
    }
    
    if (lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
      return "You can purchase SLC tokens using ETH, BNB, USDT, or USDC. Simply connect your wallet above and choose your payment method. The minimum purchase is $10. 💰";
    }
    
    if (lowerMessage.includes('vip') || lowerMessage.includes('bonus')) {
      return "VIP levels offer increasing bonuses: VIP 1 (20,000 SCT) = 20% bonus, VIP 2 (50,000 SCT) = 40% bonus, up to VIP 5 (500,000 SCT) = 100% bonus! ⭐";
    }
    
    if (lowerMessage.includes('supply') || lowerMessage.includes('tokenomics')) {
      return "Total supply is 6 billion SLC tokens: 30% public sale, 15% private sale, 10% marketing, 10% team, 10% reserve, 5% charity, 5% airdrop. 📊";
    }
    
    if (lowerMessage.includes('contract') || lowerMessage.includes('address')) {
      return "The SLC token contract address is: 0xeaa91F0ef29ECE13dB9F2B46982DDbFa9ff83412. Always verify contracts before transactions! 🔒";
    }
    
    if (lowerMessage.includes('claim') || lowerMessage.includes('vesting')) {
      return "Token claiming will be available after the presale ends. Vesting details will be announced closer to the Token Generation Event (TGE). 📅";
    }
    
    return "I'm here to help with SolarCrowdin questions! Ask me about token prices, how to buy, VIP levels, tokenomics, or anything else about the SLC presale. ☀️";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage);
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-orange-200 w-80 h-96 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  ☀️
                </div>
                <div>
                  <h3 className="text-white font-semibold">SolarBot AI</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-orange-50/30 to-white/30">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.isBot 
                      ? 'bg-white/80 text-gray-800 border border-orange-200' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/80 border border-orange-200 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-orange-200 bg-white/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about SLC presale..."
                  className="flex-1 bg-white/80 border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300"
          >
            <FiMessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatBot;
