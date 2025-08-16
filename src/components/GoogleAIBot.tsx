
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const GOOGLE_AI_API_KEY = 'AIzaSyD_4IQvTGmdf1LNLVnmw46dKsEsJnw_C-w';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: number;
}

const GoogleAIBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hello! I'm SolarBot AI ☀️ Your intelligent assistant for SolarCrowdin. I can help you with the SLC presale, answer technical questions, and guide you through the platform. How can I assist you today?", 
      isBot: true,
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callGoogleAI = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_AI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are SolarBot AI, an expert assistant for SolarCrowdin - a revolutionary solar energy crowdfunding platform. 

Context:
- SolarCrowdin is launching the SLC token presale at $0.063 per token
- Listing price will be $0.14 (122% potential gain)
- Total supply: 6 billion SLC tokens
- VIP levels offer increasing bonuses (20% to 100%)
- Platform supports ETH, BNB, USDT, USDC payments
- Contract address: 0xeaa91F0ef29ECE13dB9F2B46982DDbFa9ff83412
- Focus on solar energy, AI optimization, and sustainable technology

User question: ${userMessage}

Please provide a helpful, accurate response about SolarCrowdin, the SLC token, or related topics. Keep responses conversational but informative. Use relevant emojis. If asked about topics outside of SolarCrowdin/crypto/solar energy, politely redirect to SolarCrowdin topics.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "I apologize, but I'm having trouble processing your request right now. Please try asking about the SLC presale, tokenomics, or how to participate!";
    } catch (error) {
      console.error('Google AI API Error:', error);
      return "I'm experiencing technical difficulties. Please try again in a moment, or ask me about the SLC token presale basics!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    const newMessage: Message = {
      text: userMessage,
      isBot: false,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await callGoogleAI(userMessage);
      const botMessage: Message = {
        text: aiResponse,
        isBot: true,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast.error('Failed to get AI response');
      const errorMessage: Message = {
        text: "Sorry, I'm having trouble connecting right now. Please try again or ask me about the SLC presale basics!",
        isBot: true,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
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

  return (
    <div className="fixed bottom-6 right-6 z-[9000]">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`bg-white rounded-xl shadow-2xl border border-orange-200 flex flex-col overflow-hidden ${
              isMinimized 
                ? 'w-80 h-16' 
                : 'w-80 sm:w-96 h-96 sm:h-[500px]'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">🤖</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">SolarBot AI</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80 text-xs">Powered by Google AI</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors p-1"
                >
                  {isMinimized ? <FiMaximize2 size={16} /> : <FiMinimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-orange-50/30 to-white/30 min-h-0">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                        message.isBot 
                          ? 'bg-white border border-orange-200 text-gray-800 shadow-sm' 
                          : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm'
                      }`}>
                        <p className="whitespace-pre-wrap break-words">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-orange-200 p-3 rounded-lg shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-orange-200 bg-white/80 backdrop-blur-sm flex-shrink-0">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about SLC presale, solar energy..."
                      className="flex-1 bg-white border border-orange-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                      disabled={isLoading}
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      <FiSend size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
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
            <span className="text-2xl">🤖</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GoogleAIBot;
