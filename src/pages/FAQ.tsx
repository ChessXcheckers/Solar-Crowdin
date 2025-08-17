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
      answer: "SolarCrowdin is a platform that merges AI with renewable energy and carbon markets. We enable investors to co-own solar projects in emerging economies and trade verified carbon credits, all powered by our BEP-20 utility token, SLC."
    },
    {
      question: "2. What problem does SolarCrowdin solve?",
      answer: "We tackle the lack of transparency and access in green investments. By using AI for project verification and blockchain for transactions, we connect investors directly to high-impact projects in low and medium-income countries, removing middlemen and increasing trust."
    },
    {
      question: "3. What is the $SCL token?",
      answer: "$SCL is the utility token for the SolarCrowdin ecosystem. It's used for settling electricity bills, paying carbon market fees, staking to earn rewards from real-world project revenue, and voting on governance proposals."
    },
    {
      question: "4. What are the presale stages and prices?",
      answer: "Our presale has three stages: Seed at $0.03, Private at $0.04, and Public at $0.05. Each stage has specific vesting schedules to ensure long-term project alignment."
    },
    {
      question: "5. How is the token supply structured?",
      answer: "The total supply is fixed at 1 billion SLC. The distribution is: Public Sale (25%), Private Sale (12%), Seed/Strategic (5%), Team/Advisors (12%), Ecosystem/Rewards (20%), Development (10%), Treasury (10%), Community Fund (3%), and Liquidity (2%)."
    },
    {
      question: "6. How does SolarCrowdin generate revenue?",
      answer: "Revenue comes from three main sources: fees from our carbon credit marketplace, margins on energy payments settled in SLC, and spreads from our lease-to-own solar project financing."
    },
    {
      question: "7. Where will the tokens be listed?",
      answer: "After the presale, SLC will be listed on leading BNB Smart Chain decentralized exchanges (DEXs) like PancakeSwap. We will also pursue listings on major centralized exchanges (CEXs) as the platform grows."
    },
    {
      question: "8. How do investors make money with $SCL tokens?",
      answer: "Investors can benefit from potential token appreciation driven by real-world utility, earn staking rewards sourced directly from platform revenues (not token inflation), and participate in the governance of revenue-generating energy projects."
    },
    {
      question: "9. How are presale funds used?",
      answer: "Proceeds are directed to project deployments, ensuring compliance and audits, providing liquidity, and funding operations. We provide monthly reports on fund allocation."
    },
    {
      question: "10. Who can participate in the presale?",
      answer: "Anyone can participate, subject to regional regulations. All participants must complete a KYC/AML verification process to comply with legal standards."
    },
    {
      question: "11. How are investor protections ensured?",
      answer: "We provide multiple layers of security: no team tokens unlock at launch, liquidity is locked for two years, the minting function is disabled, and all treasury wallets are public. A top-tier smart contract audit will also be completed before launch."
    },
    {
      question: "12. How do I buy tokens during the presale?",
      answer: "1. Set up a crypto wallet that supports BNB Smart Chain (e.g., MetaMask, Trust Wallet). 2. Fund your wallet with BNB (for gas fees) and a payment currency (BNB, USDT, or USDC). 3. Connect your wallet to our official presale portal. 4. Enter the amount you wish to purchase and confirm the transaction."
    },
    {
      question: "13. What is the vesting schedule for presale tokens?",
      answer: "Public sale tokens unlock 20% at launch, with the rest vesting over 12 months. Private sale tokens unlock 10% at launch and vest over 18 months. Seed and team tokens have longer vesting periods with cliffs."
    },
    {
      question: "14. What is the Buyback-and-Burn program?",
      answer: "35% of our net platform revenues are used to buy SLC tokens from the open market and permanently burn them. This creates deflationary pressure and increases the token's scarcity over time."
    },
    {
      question: "15. How does SolarCrowdin use AI?",
      answer: "AI is used for predictive analytics to forecast energy demand, optimize solar grid performance, and for Monitoring, Reporting, and Verification (MRV) of carbon credits to ensure their authenticity and impact."
    }
  ];

  return (
    <div className="min-h-screen bg-solar-navy pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-solar-warm-white mb-4">
            Frequently Asked <span className="nebulae-text">Questions</span>
          </h1>
          <p className="text-lg text-solar-grey">
            Everything you need to know about the SolarCrowdin ICO and our mission.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline text-solar-warm-white">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-solar-grey text-base">
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
