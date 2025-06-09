
import { useState } from 'react';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Solar Crowding?",
      answer: "Solar Crowding is a revolutionary platform that combines AI technology with solar energy solutions, allowing users to participate in a decentralized solar energy ecosystem while earning $SOLAR tokens."
    },
    {
      question: "How does the $SOLAR token work?",
      answer: "The $SOLAR token is used to incentivize participation in our solar energy network. Token holders can earn rewards by contributing to solar energy generation and optimization through our AI-driven platform."
    },
    {
      question: "What is the token vesting schedule?",
      answer: "Token vesting ensures long-term commitment. Presale tokens have a 6-month vesting period with monthly releases starting from TGE (Token Generation Event)."
    },
    {
      question: "When is the Token Generation Event (TGE)?",
      answer: "The TGE is scheduled for Q1 2025, following the completion of our presale and platform development milestones."
    },
    {
      question: "How can I participate in the presale?",
      answer: "You can participate by connecting your Web3 wallet and purchasing $SOLAR tokens using ETH, BNB, USDT, or USDC. The current presale price is $0.063 per token."
    },
    {
      question: "Is the smart contract audited?",
      answer: "Yes, our smart contract has been audited by leading blockchain security firms to ensure the safety and security of all transactions and token holdings."
    }
  ];

  return (
    <section className="section-spacing starburst-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-solar-warm-white">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="starburst-border rounded-lg">
              <div className="bg-solar-dark/90">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-solar-orange/10 transition-colors duration-300"
                >
                  <span className="font-semibold text-solar-warm-white pr-4">
                    {faq.question}
                  </span>
                  <span className={`text-solar-gold text-xl transition-transform duration-300 ${
                    openFAQ === index ? 'rotate-45' : ''
                  }`}>
                    ⭐
                  </span>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 text-solar-grey leading-relaxed animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
