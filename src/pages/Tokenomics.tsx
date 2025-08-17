import React from 'react';
import { TOKEN_INFO, TOKEN_ALLOCATION } from '../constants/contracts';
import { FiShield, FiTrendingUp, FiGitPullRequest, FiClock, FiPieChart } from 'react-icons/fi';

const Tokenomics: React.FC = () => {
  const salePricing = [
    { stage: "Seed", price: "$0.03", note: "Long vesting" },
    { stage: "Private", price: "$0.04", note: "Enforced vesting" },
    { stage: "Public", price: "$0.05", note: "Scarce supply" }
  ];

  const revenueAllocation = [
    { percent: "35%", use: "Buyback & Burn", description: "To purchase SCL from the market and send to a burn address, reducing supply.", color: "bg-red-500" },
    { percent: "35%", use: "Staker Rewards", description: "To buy SCL from the market and distribute to stakers, sourced from real cash flows.", color: "bg-green-500" },
    { percent: "30%", use: "Treasury & Operations", description: "To fund ongoing development, partnerships, and platform maintenance.", color: "bg-blue-500" }
  ];

  const investorProtections = [
    "No team or advisor tokens unlock at launch.",
    "Liquidity is locked for two years.",
    "Minting functionality is renounced, capping the total supply.",
    "Treasury is governed by a multi-signature wallet with independent signers.",
    "Top-tier smart contract audit will be completed and published before launch.",
    "All token unlocks follow a publicly visible on-chain schedule.",
    "DAO-gated spending rules and quarterly proofs of revenue."
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            A Tokenomics Model Built for <span className="text-orange-600">Sustainable Growth</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            The SolarCrowdin (SCL) utility token is designed with a fixed supply, real revenue-backed rewards, and transparent on-chain mechanics to foster long-term value and trust.
          </p>
        </section>

        {/* Core Info */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-center">
          <div className="bg-gray-50 p-6 rounded-xl">
            <FiPieChart className="mx-auto text-orange-600 mb-2" size={32} />
            <p className="text-sm text-gray-500">Total Supply</p>
            <p className="text-2xl font-bold text-gray-800">{parseInt(TOKEN_INFO.totalSupply).toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <FiTrendingUp className="mx-auto text-orange-600 mb-2" size={32} />
            <p className="text-sm text-gray-500">Token Type</p>
            <p className="text-2xl font-bold text-gray-800">BEP-20 Utility</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <FiGitPullRequest className="mx-auto text-orange-600 mb-2" size={32} />
            <p className="text-sm text-gray-500">Rewards Source</p>
            <p className="text-2xl font-bold text-gray-800">Platform Revenue</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <FiShield className="mx-auto text-orange-600 mb-2" size={32} />
            <p className="text-sm text-gray-500">Minting</p>
            <p className="text-2xl font-bold text-gray-800">Renounced</p>
          </div>
        </section>

        {/* Allocation and Vesting Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Token Allocation & Vesting Schedule</h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3 text-right">Percentage</th>
                  <th scope="col" className="px-6 py-3 text-right">Tokens</th>
                  <th scope="col" className="px-6 py-3">Vesting Schedule</th>
                </tr>
              </thead>
              <tbody>
                {TOKEN_ALLOCATION.map((item) => (
                  <tr key={item.category} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                      <span className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></span>
                      {item.category}
                    </th>
                    <td className="px-6 py-4 text-right font-bold">{item.percentage}%</td>
                    <td className="px-6 py-4 text-right">{parseInt(item.tokens).toLocaleString()}</td>
                    <td className="px-6 py-4">{item.vesting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sale Pricing & Revenue Allocation */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Sale Pricing</h3>
            <div className="space-y-3">
              {salePricing.map(tier => (
                <div key={tier.stage} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                  <span className="font-semibold">{tier.stage}</span>
                  <div>
                    <span className="font-bold text-orange-600 text-lg">{tier.price}</span>
                    <span className="text-xs text-gray-500 ml-2">({tier.note})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Quarterly Revenue Allocation</h3>
             <div className="space-y-2">
              {revenueAllocation.map((item) => (
                <div key={item.use} className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">{item.use}</span>
                    <span className={`font-bold text-lg ${item.color.replace('bg-', 'text-')}`}>{item.percent}</span>
                  </div>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investor Protections */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Investor Protections & Transparency</h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {investorProtections.map((protection, index) => (
              <div key={index} className="flex items-start">
                <FiShield className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
                <p className="text-gray-700">{protection}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Tokenomics;
