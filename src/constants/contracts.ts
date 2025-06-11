export const USDT_CONTRACT = {
  address: process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS || '',
  abi: [
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function allowance(address owner, address spender) external view returns (uint256)',
    'function balanceOf(address account) external view returns (uint256)'
  ]
};

export const USDC_CONTRACT = {
  address: process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS || '',
  abi: [
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function allowance(address owner, address spender) external view returns (uint256)',
    'function balanceOf(address account) external view returns (uint256)'
  ]
};

export const TOKEN_CONTRACT = {
  address: "0xeaa91F0ef29ECE13dB9F2B46982DDbFa9ff83412",
  abi: [
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function balanceOf(address account) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function transfer(address recipient, uint256 amount) returns (bool)",
    "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)"
  ]
};

export const PRESALE_CONTRACT = {
  address: process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS || '',
  abi: [
    'function BuyWithUSDT(uint256 amount) external',
    'function BuyWithUSDC(uint256 amount) external',
    'function BuyWithBNB() external payable',
    'function claimTokens() external',
    'function totalUSDTRaised() external view returns (uint256)',
    'function TokenSold() external view returns (uint256)',
    'function presaleStatus() external view returns (bool)',
    'function IsClaim() external view returns (bool)',
    'function TokenPricePerUSDC() external view returns (uint256)',
    'function maxTokeninPresale() external view returns (uint256)',
    'function isBlacklist(address) external view returns (bool)',
    'event BuyTokens(address indexed buyer, uint256 amount, uint256 tokens)'
  ]
};

// BNB/USD Price Feed Contract (BSC Mainnet)
export const BNB_PRICE_FEED = {
  address: process.env.NEXT_PUBLIC_BNB_PRICE_FEED_ADDRESS || '',
  abi: [
    'function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)'
  ]
};

// Contract Events
export const PRESALE_EVENTS = {
  BUY_TOKENS: 'BuyTokens',
  CLAIM_TOKENS: 'ClaimTokens',
  REFERRAL_BONUS: 'ReferralBonus',
  PRESALE_STATUS_CHANGED: 'PresaleStatusChanged',
  BLACKLIST_UPDATED: 'BlacklistUpdated'
};

// Contract Errors
export const PRESALE_ERRORS = {
  INVALID_AMOUNT: 'Invalid amount provided',
  MIN_AMOUNT_NOT_MET: 'Amount below minimum required',
  MAX_TOKENS_EXCEEDED: 'Amount exceeds maximum allowed',
  PRESALE_NOT_ACTIVE: 'Presale is not active',
  BLACKLISTED: 'Your address is blacklisted',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  TRANSACTION_FAILED: 'Transaction failed',
  NETWORK_ERROR: 'Network error occurred',
  CONTRACT_ERROR: 'Contract interaction failed'
};

// Contract Constants
export const PRESALE_CONSTANTS = {
  MIN_BNB_AMOUNT: '0.01',
  MAX_BNB_AMOUNT: '10',
  MIN_USDT_AMOUNT: '10',
  MAX_USDT_AMOUNT: '10000',
  MIN_USDC_AMOUNT: '10',
  MAX_USDC_AMOUNT: '10000',
  REFERRAL_BONUS_PERCENTAGE: '5',
  VESTING_CLIFF: '30 days',
  VESTING_DURATION: '180 days'
}; 