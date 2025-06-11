import { ethers } from "hardhat";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

interface AnalyticsData {
  solarFarmEfficiency: number;
  carbonCreditValue: number;
  energyPrice: number;
  marketTrends: {
    solarDemand: number;
    carbonPrice: number;
    energyDemand: number;
  };
}

async function fetchMarketData(): Promise<AnalyticsData> {
  try {
    const response = await axios.get(process.env.MARKET_API_URL!, {
      headers: {
        "Authorization": `Bearer ${process.env.MARKET_API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
}

async function updateContractParameters() {
  const [owner] = await ethers.getSigners();
  
  // Get contract instances
  const solarFarm = await ethers.getContractAt(
    "SolarFarmFractionalization",
    process.env.SOLAR_FARM_ADDRESS!
  );
  
  const carbonCredit = await ethers.getContractAt(
    "CarbonCreditTrading",
    process.env.CARBON_CREDIT_ADDRESS!
  );
  
  const energyTrading = await ethers.getContractAt(
    "EnergyTrading",
    process.env.ENERGY_TRADING_ADDRESS!
  );

  try {
    // Fetch latest market data
    const marketData = await fetchMarketData();

    // Update solar farm parameters
    await solarFarm.updateEfficiency(marketData.solarFarmEfficiency);
    console.log("Updated solar farm efficiency");

    // Update carbon credit parameters
    await carbonCredit.updateCarbonPrice(marketData.carbonCreditValue);
    console.log("Updated carbon credit price");

    // Update energy trading parameters
    await energyTrading.updateEnergyPrice(marketData.energyPrice);
    console.log("Updated energy price");

    // Log market trends
    console.log("Market Trends:", marketData.marketTrends);

  } catch (error) {
    console.error("Error updating contract parameters:", error);
    throw error;
  }
}

// Run analytics update
updateContractParameters()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 