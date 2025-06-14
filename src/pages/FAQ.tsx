
const FAQ = () => {
  const faqs = [
    {
      question: "What is Solar Crowding?",
      answer: "Solar Crowding is a blockchain-based platform that democratizes solar energy investment through AI-driven solutions and community participation."
    },
    {
      question: "How does the $SOLAR token work?",
      answer: "The $SOLAR token serves as the utility token for our ecosystem, enabling participation in solar projects, governance voting, and earning rewards."
    },
    {
      question: "When is the token launch?",
      answer: "The presale is currently active. The official launch will follow the completion of the presale phases."
    },
    {
      question: "How can I participate in the presale?",
      answer: "Connect your wallet and purchase $SOLAR tokens using BNB, USDT, or USDC during the presale period."
    },
    {
      question: "Is there a minimum purchase amount?",
      answer: "Yes, the minimum purchase amount is $10 worth of tokens during the presale."
    },
    {
      question: "When can I claim my tokens?",
      answer: "Tokens will be claimable after the presale ends and the official launch occurs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Frequently Asked <span className="text-orange-600">Questions</span>
        </h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
