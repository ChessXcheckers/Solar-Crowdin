
// Environment configuration for browser
export const config = {
  NETWORK_ID: import.meta.env.VITE_NETWORK_ID || '56',
  RPC_URL: import.meta.env.VITE_RPC_URL || 'https://bsc-dataseed.binance.org/',
  
  // Contract Addresses
  PRESALE_CONTRACT_ADDRESS: import.meta.env.VITE_PRESALE_CONTRACT_ADDRESS || '0x46718468baC0e1E6621BFa593f9CDEbA3f96D99e',
  USDT_CONTRACT_ADDRESS: import.meta.env.VITE_USDT_CONTRACT_ADDRESS || '0x55d398326f99059fF775485246999027B3197955',
  USDC_CONTRACT_ADDRESS: import.meta.env.VITE_USDC_CONTRACT_ADDRESS || '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  MATIC_PRICE_FEED_ADDRESS: import.meta.env.VITE_MATIC_PRICE_FEED_ADDRESS || '0x7bAC85A8a13A4BcD8abb3eB7d6b453740C2563C3',
  
  // API Configuration
  MARKET_API_URL: import.meta.env.VITE_MARKET_API_URL || 'https://api.coingecko.com/api/v3',
  
  // App Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Solar Crowdin',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Decentralized Crowdfunding Platform',
  APP_URL: import.meta.env.VITE_APP_URL || 'https://solarcrowdin.com'
};
