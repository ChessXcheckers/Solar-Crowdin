import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const FAQ_ITEMS = [
  {
    question: 'What is Solar Crowdin?',
    answer: 'Solar Crowdin is a decentralized platform that enables fractional ownership of solar energy assets. We connect investors with solar projects, allowing them to earn returns while promoting renewable energy adoption.'
  },
  {
    question: 'How does the token presale work?',
    answer: 'The token presale allows early investors to purchase SOLAR tokens at a discounted rate. Tokens can be bought using BNB, USDT, or USDC. The presale is divided into stages with increasing prices.'
  },
  {
    question: 'What are the benefits of holding SOLAR tokens?',
    answer: 'SOLAR token holders can earn passive income through staking, participate in governance decisions, receive rewards from solar project revenues, and access exclusive platform features.'
  },
  {
    question: 'How are solar projects selected?',
    answer: 'Projects undergo rigorous due diligence, including technical feasibility, financial viability, and environmental impact assessments. Only projects meeting our high standards are listed on the platform.'
  },
  {
    question: 'What is the minimum investment amount?',
    answer: 'The minimum investment varies by project, but typically starts at 0.1 BNB or equivalent in USDT/USDC. This low barrier to entry makes solar investment accessible to everyone.'
  },
  {
    question: 'How are returns distributed?',
    answer: 'Returns are distributed automatically through smart contracts. Investors receive their share of project revenues in the form of stablecoins or additional SOLAR tokens, depending on their preference.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-gray-600">
            Find answers to common questions about Solar Crowdin
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg"
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-900">
                  {item.question}
                </span>
                <FiChevronDown
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 