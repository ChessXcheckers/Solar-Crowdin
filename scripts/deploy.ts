import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("Starting deployment...");

  // Deploy SLC Token
  console.log("Deploying SLC Token...");
  const SolarCrowdinToken = await ethers.getContractFactory("SolarCrowdinToken");
  const slcToken = await SolarCrowdinToken.deploy();
  await slcToken.waitForDeployment();
  console.log(`SLC Token deployed to: ${await slcToken.getAddress()}`);

  // Deploy Solar Farm Fractionalization
  console.log("Deploying Solar Farm Fractionalization...");
  const SolarFarmFractionalization = await ethers.getContractFactory("SolarFarmFractionalization");
  const solarFarm = await SolarFarmFractionalization.deploy(await slcToken.getAddress());
  await solarFarm.waitForDeployment();
  console.log(`Solar Farm Fractionalization deployed to: ${await solarFarm.getAddress()}`);

  // Deploy Carbon Credit Trading
  console.log("Deploying Carbon Credit Trading...");
  const CarbonCreditTrading = await ethers.getContractFactory("CarbonCreditTrading");
  const carbonCredit = await CarbonCreditTrading.deploy(await slcToken.getAddress());
  await carbonCredit.waitForDeployment();
  console.log(`Carbon Credit Trading deployed to: ${await carbonCredit.getAddress()}`);

  // Deploy Energy Trading
  console.log("Deploying Energy Trading...");
  const EnergyTrading = await ethers.getContractFactory("EnergyTrading");
  const energyTrading = await EnergyTrading.deploy(await slcToken.getAddress());
  await energyTrading.waitForDeployment();
  console.log(`Energy Trading deployed to: ${await energyTrading.getAddress()}`);

  // Save deployment addresses
  const addresses = {
    slcToken: await slcToken.getAddress(),
    solarFarm: await solarFarm.getAddress(),
    carbonCredit: await carbonCredit.getAddress(),
    energyTrading: await energyTrading.getAddress(),
    network: network.name,
    timestamp: new Date().toISOString()
  };

  const deploymentPath = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentPath)) {
    fs.mkdirSync(deploymentPath);
  }

  fs.writeFileSync(
    path.join(deploymentPath, `${network.name}.json`),
    JSON.stringify(addresses, null, 2)
  );

  console.log("Deployment completed successfully!");
  console.log("Contract addresses saved to deployments directory.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 