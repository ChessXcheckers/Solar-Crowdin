import { ethers, network } from "hardhat";
import * as fs from "fs";
import * as path from "path";
import { parseEther } from "ethers";

async function main() {
  console.log("Starting deployment on network:", network.name);
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy SCL Token
  console.log("Deploying SolarCrowdinToken (SCL)...");
  const SolarCrowdinToken = await ethers.getContractFactory("SolarCrowdinToken");
  const slcToken = await SolarCrowdinToken.deploy();
  await slcToken.waitForDeployment();
  const slcTokenAddress = await slcToken.getAddress();
  console.log(`SCL Token deployed to: ${slcTokenAddress}`);

  // Deploy other core contracts
  console.log("Deploying SolarFarmFractionalization...");
  const SolarFarmFractionalization = await ethers.getContractFactory("SolarFarmFractionalization");
  const solarFarm = await SolarFarmFractionalization.deploy(slcTokenAddress);
  await solarFarm.waitForDeployment();
  console.log(`SolarFarmFractionalization deployed to: ${await solarFarm.getAddress()}`);

  console.log("Deploying CarbonCreditTrading...");
  const CarbonCreditTrading = await ethers.getContractFactory("CarbonCreditTrading");
  const carbonCredit = await CarbonCreditTrading.deploy(slcTokenAddress);
  await carbonCredit.waitForDeployment();
  console.log(`CarbonCreditTrading deployed to: ${await carbonCredit.getAddress()}`);

  console.log("Deploying EnergyTrading...");
  const EnergyTrading = await ethers.getContractFactory("EnergyTrading");
  const energyTrading = await EnergyTrading.deploy(slcTokenAddress);
  await energyTrading.waitForDeployment();
  console.log(`Energy Trading deployed to: ${await energyTrading.getAddress()}`);

  // Deploy Presale contract
  console.log("Deploying Presale...");
  const Presale = await ethers.getContractFactory("Presale");
  const projectWallet = "0x...PROJECT_WALLET"; // Placeholder
  const developerWallet = "0x...DEVELOPER_WALLET"; // Placeholder
  const tokenPrice = 50000000000000000; // $0.05 with 18 decimals
  const maxTokensForSale = parseEther("250000000"); // 25% of 1B for public sale
  const usdcAddress = "0x...USDC_ADDRESS"; // Placeholder for USDC contract address on the target network
  const usdtAddress = "0x...USDT_ADDRESS"; // Placeholder for USDT contract address on the target network

  const presale = await Presale.deploy(
    slcTokenAddress,
    usdcAddress,
    usdtAddress,
    projectWallet,
    developerWallet,
    tokenPrice,
    maxTokensForSale
  );
  await presale.waitForDeployment();
  console.log(`Presale deployed to: ${await presale.getAddress()}`);

  // --- Vesting Contract Deployment ---
  console.log("\n--- Starting Vesting Contract Deployment ---");
  const TokenVesting = await ethers.getContractFactory("TokenVesting");
  const now = Math.floor(Date.now() / 1000);
  const vestingAddresses: { [key: string]: string } = {};

  // Vesting configurations based on tokenomics
  // NOTE: Beneficiary addresses are placeholders and should be replaced with real addresses.
  const vestingSchedules = [
    {
      name: "Team & Advisors",
      beneficiary: "0x0000000000000000000000000000000000000001", // Placeholder
      amount: parseEther("120000000"), // 12% of 1B
      cliff: 6 * 30 * 24 * 60 * 60, // 6 months
      duration: 36 * 30 * 24 * 60 * 60, // 36 months
      revocable: true,
    },
    {
      name: "Seed & Strategic Partners",
      beneficiary: "0x0000000000000000000000000000000000000002", // Placeholder
      amount: parseEther("50000000"), // 5% of 1B
      cliff: 3 * 30 * 24 * 60 * 60, // 3 months
      duration: 24 * 30 * 24 * 60 * 60, // 24 months
      revocable: true,
    },
    {
      name: "Private Sale",
      beneficiary: "0x0000000000000000000000000000000000000003", // Placeholder for a treasury contract
      amount: parseEther("120000000"), // 12% of 1B
      cliff: 0, // No cliff
      duration: 18 * 30 * 24 * 60 * 60, // 18 months
      revocable: false,
    },
  ];

  for (const schedule of vestingSchedules) {
    console.log(`\nDeploying vesting contract for: ${schedule.name}`);
    const vestingContract = await TokenVesting.deploy(
      schedule.beneficiary,
      now,
      schedule.cliff,
      schedule.duration,
      schedule.revocable
    );
    await vestingContract.waitForDeployment();
    const vestingContractAddress = await vestingContract.getAddress();
    vestingAddresses[schedule.name.replace(/ & | /g, "_")] = vestingContractAddress;
    console.log(`${schedule.name} vesting contract deployed to: ${vestingContractAddress}`);

    console.log(`Transferring ${ethers.formatEther(schedule.amount)} SCL to the vesting contract...`);
    const transferTx = await slcToken.transfer(vestingContractAddress, schedule.amount);
    await transferTx.wait();
    console.log("Transfer complete.");
  }

  // --- Save Deployment Addresses ---
  const addresses = {
    slcToken: slcTokenAddress,
    presale: await presale.getAddress(),
    solarFarm: await solarFarm.getAddress(),
    carbonCredit: await carbonCredit.getAddress(),
    energyTrading: await energyTrading.getAddress(),
    vesting: vestingAddresses,
    network: network.name,
    timestamp: new Date().toISOString()
  };

  const deploymentPath = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentPath)) {
    fs.mkdirSync(deploymentPath, { recursive: true });
  }

  fs.writeFileSync(
    path.join(deploymentPath, `${network.name}-deployment.json`),
    JSON.stringify(addresses, null, 2)
  );

  console.log("\nDeployment completed successfully!");
  console.log("Contract addresses saved to deployments directory.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 