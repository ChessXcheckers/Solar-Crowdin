# SolarCrowdIn

A decentralized platform for solar energy investment and trading, integrating AI analytics for market insights.

## Features

- Solar Farm Fractionalization
- Carbon Credit Trading
- Energy Trading
- AI-powered Market Analytics
- Smart Contract Integration

## Prerequisites

- Node.js (v16+)
- npm or yarn
- Hardhat
- MetaMask or similar Web3 wallet

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/solarcrowdin.git
cd solarcrowdin
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PRIVATE_KEY=your_wallet_private_key
INFURA_API_KEY=your_infura_api_key
MARKET_API_URL=your_market_data_api_url
MARKET_API_KEY=your_market_data_api_key
```

## Smart Contracts

The platform consists of four main smart contracts:

1. `SolarCrowdinToken.sol`: ERC20 token for platform transactions
2. `SolarFarmFractionalization.sol`: Manages solar farm investments
3. `CarbonCreditTrading.sol`: Handles carbon credit trading
4. `EnergyTrading.sol`: Facilitates energy trading

## Testing

Run the test suite:
```bash
npm test
```

## Deployment

1. Compile contracts:
```bash
npm run compile
```

2. Deploy to network:
```bash
npm run deploy -- <network>
```

## AI Analytics

The platform includes AI-powered analytics for market insights. Run the analytics script:
```bash
npm run analytics -- <network>
```

## Security

- All contracts are audited and follow OpenZeppelin standards
- Access control implemented for sensitive operations
- Regular security updates and monitoring

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
