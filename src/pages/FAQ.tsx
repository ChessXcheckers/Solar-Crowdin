import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "1. What is SolarCrowdin?",
      answer: "SolarCrowdin is a blockchain-powered platform that combines artificial intelligence (AI), carbon credit trading, and renewable energy investments. Our mission is to make carbon offsetting transparent, accessible, and profitable while funding real-world clean energy projects."
    },
    {
      question: "2. What problem does SolarCrowdin solve?",
      answer: "The current carbon credit market is often opaque, expensive due to middlemen, and hard for small investors to access. SolarCrowdin solves this by using AI-driven MRV (Monitoring, Reporting, Verification) for authenticity and running all transactions on a transparent blockchain, allowing anyone to participate."
    },
    {
      question: "3. What is the $SCL token?",
      answer: "$SCL is our native utility token that powers the SolarCrowdin ecosystem. It will be used for buying verified carbon credits, staking for rewards, participating in governance (voting on projects), and trading on decentralized exchanges."
    },
    {
      question: "4. How does the ICO work?",
      answer: "During the ICO, investors can purchase $SCL tokens at a discounted rate before exchange listings. The ICO has three phases: a Seed Round for private investors, a Pre-Sale for community members at a lower price, and a Public Sale open to everyone."
    },
    {
      question: "5. Is SolarCrowdin regulated and secure?",
      answer: "Yes. SolarCrowdin is registered as a legal entity and will comply with international KYC/AML regulations. To protect investor funds, our smart contracts are audited by third-party security firms."
    },
    {
      question: "6. What makes SolarCrowdin unique compared to other green tokens?",
      answer: "Our key differentiators are: real-world utility (tokens tied to carbon credits), AI-powered MRV for authenticity, a community-driven model where token holders vote on projects, and dual value creation (earning profits while reducing global emissions)."
    },
    {
      question: "7. Where will the tokens be listed?",
      answer: "After the ICO, $SCL will be listed on leading decentralized exchanges (DEXs) such as Uniswap and PancakeSwap, with plans for centralized exchange (CEX) listings like Binance and Coinbase."
    },
    {
      question: "8. How do investors make money with $SCL tokens?",
      answer: "Investors can potentially profit from token value appreciation as demand for carbon credits grows, earn passive income through staking rewards, receive discounts on carbon credit purchases, and influence platform growth through governance power."
    },
    {
      question: "9. What is the roadmap for SolarCrowdin?",
      answer: "Our roadmap includes the platform development and ICO launch in 2025, token listings and partnerships in 2026, a global marketplace launch in 2027, and expansion across Asia, Africa, & South America by 2028 with a goal of offsetting 100M tons of CO2."
    },
    {
      question: "10. Who can participate in the ICO?",
      answer: "Anyone worldwide can participate, except for individuals in countries with ICO restrictions. All participants must complete KYC verification before purchasing tokens."
    },
    {
      question: "11. How will the raised funds be used?",
      answer: "Funds are allocated as follows: 40% to platform development & AI infrastructure, 25% to marketing & community growth, 20% to strategic partnerships & project onboarding, 10% to operations & compliance, and 5% to a reserve fund."
    },
    {
      question: "12. How do I buy tokens during the ICO?",
      answer: "1. Create a crypto wallet (MetaMask or Trust Wallet recommended). 2. Buy ETH/BNB/USDT on an exchange. 3. Connect your wallet to the SolarCrowdin ICO portal. 4. Exchange your crypto for $SCL tokens. 5. Claim your tokens after the ICO ends."
    },
    {
      question: "13. Is there a minimum or maximum investment?",
      answer: "Yes. The minimum investment is $50, and the maximum is $100,000 per wallet to ensure fair distribution."
    },
    {
      question: "14. When will I receive my tokens?",
      answer: "Tokens will be automatically distributed to your wallet after the ICO ends. Private investors' tokens will be subject to a vesting schedule to prevent market dumping."
    },
    {
      question: "15. How does SolarCrowdin impact the environment?",
      answer: "For every $SCL token transaction, a portion of the fee directly funds real-world solar, wind, renewable energy, and forestation projects, ensuring measurable CO2 reduction and community empowerment."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-solar-warm-white mb-4">
            Frequently Asked <span className="nebulae-text">Questions</span>
          </h1>
          <p className="text-lg text-gray-800 dark:text-solar-grey">
            Everything you need to know about the SolarCrowdin ICO and our mission.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline text-gray-900 dark:text-solar-warm-white">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-800 dark:text-solar-grey text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
