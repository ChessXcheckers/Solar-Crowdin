// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./SolarCrowdinToken.sol";

contract EnergyTrading is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tradeIds;
    
    SolarCrowdinToken public slcToken;
    
    struct EnergyTrade {
        address seller;
        address buyer;
        uint256 amount; // in kWh
        uint256 price; // in SLC tokens per kWh
        uint256 timestamp;
        bool isCompleted;
        bool isCancelled;
    }
    
    struct EnergyBalance {
        uint256 available; // in kWh
        uint256 price; // in SLC tokens per kWh
        bool isActive;
    }
    
    // Mapping from trade ID to EnergyTrade
    mapping(uint256 => EnergyTrade) public energyTrades;
    
    // Mapping from address to EnergyBalance
    mapping(address => EnergyBalance) public energyBalances;
    
    // Events
    event EnergyListed(address indexed seller, uint256 amount, uint256 price);
    event EnergyUnlisted(address indexed seller);
    event EnergyTraded(uint256 indexed tradeId, address indexed seller, address indexed buyer, uint256 amount);
    event EnergyTradeCompleted(uint256 indexed tradeId);
    event EnergyTradeCancelled(uint256 indexed tradeId);
    
    constructor(address _slcToken) Ownable(msg.sender) {
        slcToken = SolarCrowdinToken(_slcToken);
    }
    
    // List energy for sale
    function listEnergy(uint256 _amount, uint256 _price) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(_price > 0, "Price must be greater than 0");
        
        EnergyBalance storage balance = energyBalances[msg.sender];
        balance.available = _amount;
        balance.price = _price;
        balance.isActive = true;
        
        emit EnergyListed(msg.sender, _amount, _price);
    }
    
    // Unlist energy
    function unlistEnergy() external {
        EnergyBalance storage balance = energyBalances[msg.sender];
        require(balance.isActive, "No energy listed");
        
        balance.isActive = false;
        balance.available = 0;
        
        emit EnergyUnlisted(msg.sender);
    }
    
    // Create energy trade
    function createEnergyTrade(address _seller, uint256 _amount) external nonReentrant {
        EnergyBalance storage sellerBalance = energyBalances[_seller];
        require(sellerBalance.isActive, "Seller has no energy listed");
        require(_amount > 0 && _amount <= sellerBalance.available, "Invalid amount");
        
        _tradeIds.increment();
        uint256 newTradeId = _tradeIds.current();
        
        EnergyTrade storage trade = energyTrades[newTradeId];
        trade.seller = _seller;
        trade.buyer = msg.sender;
        trade.amount = _amount;
        trade.price = sellerBalance.price;
        trade.timestamp = block.timestamp;
        trade.isCompleted = false;
        trade.isCancelled = false;
        
        // Calculate total cost
        uint256 totalCost = _amount * sellerBalance.price;
        
        // Transfer SLC tokens from buyer to seller
        require(slcToken.transferFrom(msg.sender, _seller, totalCost), "Token transfer failed");
        
        // Update seller's available energy
        sellerBalance.available -= _amount;
        if (sellerBalance.available == 0) {
            sellerBalance.isActive = false;
        }
        
        emit EnergyTraded(newTradeId, _seller, msg.sender, _amount);
    }
    
    // Complete energy trade
    function completeEnergyTrade(uint256 _tradeId) external {
        EnergyTrade storage trade = energyTrades[_tradeId];
        require(!trade.isCompleted && !trade.isCancelled, "Trade already completed or cancelled");
        require(msg.sender == trade.buyer || msg.sender == trade.seller, "Not authorized");
        
        trade.isCompleted = true;
        emit EnergyTradeCompleted(_tradeId);
    }
    
    // Cancel energy trade
    function cancelEnergyTrade(uint256 _tradeId) external {
        EnergyTrade storage trade = energyTrades[_tradeId];
        require(!trade.isCompleted && !trade.isCancelled, "Trade already completed or cancelled");
        require(msg.sender == trade.buyer || msg.sender == trade.seller, "Not authorized");
        
        // Refund buyer
        uint256 totalCost = trade.amount * trade.price;
        require(slcToken.transferFrom(trade.seller, trade.buyer, totalCost), "Token transfer failed");
        
        // Return energy to seller
        EnergyBalance storage sellerBalance = energyBalances[trade.seller];
        sellerBalance.available += trade.amount;
        sellerBalance.isActive = true;
        
        trade.isCancelled = true;
        emit EnergyTradeCancelled(_tradeId);
    }
    
    // Get energy balance
    function getEnergyBalance(address _address) external view returns (
        uint256 available,
        uint256 price,
        bool isActive
    ) {
        EnergyBalance storage balance = energyBalances[_address];
        return (balance.available, balance.price, balance.isActive);
    }
    
    // Get trade details
    function getTradeDetails(uint256 _tradeId) external view returns (
        address seller,
        address buyer,
        uint256 amount,
        uint256 price,
        uint256 timestamp,
        bool isCompleted,
        bool isCancelled
    ) {
        EnergyTrade storage trade = energyTrades[_tradeId];
        return (
            trade.seller,
            trade.buyer,
            trade.amount,
            trade.price,
            trade.timestamp,
            trade.isCompleted,
            trade.isCancelled
        );
    }
    
    // Emergency functions
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = slcToken.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(slcToken.transfer(owner(), balance), "Token transfer failed");
    }
} 