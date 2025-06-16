
import React, { useState, useRef, useEffect } from 'react';

const AICheatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm SolarBot AI ☀️ Your intelligent assistant for everything about SolarCrowdin! Ask me about our tokenomics, VIP levels, presale details, or anything else!", 
      isBot: true 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string) => {
    // Enhanced responses based on SolarCrowdin context
    const responses = [
      `Great question about SolarCrowdin! 🌞 Our SLC token has a total supply of 6 billion tokens with 30% allocated for public sale at the current price of $0.063. The listing price will be $0.14, offering potential gains!`,
      
      `☀️ VIP Benefits Explained: We have 5 VIP levels (🌤️ → ☀️ → 🌞 → ✨☀️✨ → 💥☀️💥) with bonuses from 20% to 100%! Each level requires different SLC holdings and comes with increasingly bright solar emojis to show your status!`,
      
      `🚀 About our presale: You can purchase SLC tokens using BNB, USDT, or USDC. Our smart contract is deployed on BSC at 0x46718468baC0e1E6621BFa593f9CDEbA3f96D99e. All transactions are secure and verified!`,
      
      `💡 AI Solar Technology: SolarCrowdin combines artificial intelligence with solar energy solutions. Our platform uses machine learning to optimize energy production, distribution, and trading in real-time!`,
      
      `📊 Token Distribution: 30% Public Sale, 15% Private Sale, 10% Marketing & Development, 10% Team, 10% Reserve, 5% Charity, 5% Airdrop. This ensures fair distribution and long-term sustainability!`,
      
      `🔒 Security & Transparency: Our smart contracts are built on proven blockchain technology. You can view all transactions on BSCScan and our contract addresses are publicly available for verification!`,
      
      `🌱 Environmental Impact: 5% of our token supply is allocated for charity, focusing on environmental causes. We're not just revolutionizing solar energy - we're making a positive impact on the world!`,
      
      `💎 Investment Opportunity: Current presale price is $0.063 with listing at $0.14 - that's a potential 122% gain! Plus, VIP holders get additional bonuses up to 100%!`
    ];
    
    // Simple keyword matching for more relevant responses
    const lowerMessage = userMessage.toLowerCase();
    let selectedResponse;
    
    if (lowerMessage.includes('vip') || lowerMessage.includes('level') || lowerMessage.includes('bonus')) {
      selectedResponse = responses[1];
    } else if (lowerMessage.includes('price') || lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
      selectedResponse = responses[2];
    } else if (lowerMessage.includes('token') || lowerMessage.includes('distribution')) {
      selectedResponse = responses[4];
    } else if (lowerMessage.includes('ai') || lowerMessage.includes('technology')) {
      selectedResponse = responses[3];
    } else if (lowerMessage.includes('security') || lowerMessage.includes('contract')) {
      selectedResponse = responses[5];
    } else if (lowerMessage.includes('charity') || lowerMessage.includes('environment')) {
      selectedResponse = responses[6];
    } else if (lowerMessage.includes('investment') || lowerMessage.includes('gain')) {
      selectedResponse = responses[7];
    } else {
      selectedResponse = responses[0];
    }
    
    return selectedResponse;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await generateResponse(userMessage);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "I'm experiencing some technical difficulties right now. Please try asking your question again in a moment! ☀️", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center text-2xl backdrop-blur-md border-2 border-white/30"
        >
          ☀️
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="w-96 h-[600px] backdrop-blur-md bg-white/10 rounded-3xl shadow-2xl border border-white/20 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 p-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-xl shadow-lg">
                ☀️
              </div>
              <div>
                <span className="font-bold text-white">SolarBot AI</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/80">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/20">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                message.isBot 
                  ? 'bg-white/10 text-white border border-white/20 backdrop-blur-sm' 
                  : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 text-white border border-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/20">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about SolarCrowdin..."
              disabled={isLoading}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500/50 backdrop-blur-sm disabled:opacity-50"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICheatBot;
