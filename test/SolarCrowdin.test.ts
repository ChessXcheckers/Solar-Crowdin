import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  SolarCrowdinToken,
  SolarFarmFractionalization,
  CarbonCreditTrading,
  EnergyTrading
} from "../typechain-types";

describe("SolarCrowdin Contracts", function () {
  let slcToken: SolarCrowdinToken;
  let solarFarm: SolarFarmFractionalization;
  let carbonCredit: CarbonCreditTrading;
  let energyTrading: EnergyTrading;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy SLC Token
    const SolarCrowdinToken = await ethers.getContractFactory("SolarCrowdinToken");
    slcToken = await SolarCrowdinToken.deploy();
    await slcToken.waitForDeployment();

    // Deploy Solar Farm
    const SolarFarmFractionalization = await ethers.getContractFactory("SolarFarmFractionalization");
    solarFarm = await SolarFarmFractionalization.deploy(await slcToken.getAddress());
    await solarFarm.waitForDeployment();

    // Deploy Carbon Credit
    const CarbonCreditTrading = await ethers.getContractFactory("CarbonCreditTrading");
    carbonCredit = await CarbonCreditTrading.deploy(await slcToken.getAddress());
    await carbonCredit.waitForDeployment();

    // Deploy Energy Trading
    const EnergyTrading = await ethers.getContractFactory("EnergyTrading");
    energyTrading = await EnergyTrading.deploy(await slcToken.getAddress());
    await energyTrading.waitForDeployment();
  });

  describe("SLC Token", function () {
    it("Should have correct name and symbol", async function () {
      expect(await slcToken.name()).to.equal("SolarCrowdin Token");
      expect(await slcToken.symbol()).to.equal("SLC");
    });

    it("Should mint tokens to owner", async function () {
      const initialSupply = await slcToken.totalSupply();
      expect(initialSupply).to.equal(ethers.parseEther("1000000"));
    });
  });

  describe("Solar Farm Fractionalization", function () {
    it("Should create a new solar farm", async function () {
      const farmId = 1;
      const capacity = ethers.parseEther("1000");
      const price = ethers.parseEther("100");
      const shares = 100;

      await solarFarm.createSolarFarm(farmId, capacity, price, shares);
      const farm = await solarFarm.solarFarms(farmId);

      expect(farm.capacity).to.equal(capacity);
      expect(farm.price).to.equal(price);
      expect(farm.totalShares).to.equal(shares);
    });

    it("Should allow users to buy shares", async function () {
      const farmId = 1;
      const shares = 10;
      const price = ethers.parseEther("100");
      
      await solarFarm.createSolarFarm(farmId, ethers.parseEther("1000"), price, 100);
      await slcToken.transfer(user1.address, ethers.parseEther("1000"));
      await slcToken.connect(user1).approve(await solarFarm.getAddress(), ethers.parseEther("1000"));
      
      await solarFarm.connect(user1).buyShares(farmId, shares);
      const userShares = await solarFarm.getUserShares(farmId, user1.address);
      expect(userShares).to.equal(shares);
    });
  });

  describe("Carbon Credit Trading", function () {
    it("Should create and list carbon credits", async function () {
      const amount = ethers.parseEther("100");
      const price = ethers.parseEther("50");
      
      await carbonCredit.createCarbonCredit(amount, price);
      const credit = await carbonCredit.carbonCredits(1);
      
      expect(credit.amount).to.equal(amount);
      expect(credit.price).to.equal(price);
    });

    it("Should allow users to buy carbon credits", async function () {
      const amount = ethers.parseEther("100");
      const price = ethers.parseEther("50");
      
      await carbonCredit.createCarbonCredit(amount, price);
      await slcToken.transfer(user1.address, ethers.parseEther("1000"));
      await slcToken.connect(user1).approve(await carbonCredit.getAddress(), ethers.parseEther("1000"));
      
      await carbonCredit.connect(user1).buyCarbonCredit(1, ethers.parseEther("10"));
      const userCredits = await carbonCredit.getUserCredits(user1.address);
      expect(userCredits).to.equal(ethers.parseEther("10"));
    });
  });

  describe("Energy Trading", function () {
    it("Should create energy listings", async function () {
      const amount = ethers.parseEther("1000");
      const price = ethers.parseEther("100");
      
      await energyTrading.createEnergyListing(amount, price);
      const listing = await energyTrading.energyListings(1);
      
      expect(listing.amount).to.equal(amount);
      expect(listing.price).to.equal(price);
    });

    it("Should allow users to buy energy", async function () {
      const amount = ethers.parseEther("1000");
      const price = ethers.parseEther("100");
      
      await energyTrading.createEnergyListing(amount, price);
      await slcToken.transfer(user1.address, ethers.parseEther("1000"));
      await slcToken.connect(user1).approve(await energyTrading.getAddress(), ethers.parseEther("1000"));
      
      await energyTrading.connect(user1).buyEnergy(1, ethers.parseEther("100"));
      const userEnergy = await energyTrading.getUserEnergy(user1.address);
      expect(userEnergy).to.equal(ethers.parseEther("100"));
    });
  });
}); 