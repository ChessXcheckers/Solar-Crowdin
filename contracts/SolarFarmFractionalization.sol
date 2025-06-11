// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./SolarCrowdinToken.sol";

contract SolarFarmFractionalization is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    SolarCrowdinToken public slcToken;
    
    struct SolarFarm {
        string name;
        string location;
        uint256 totalCapacity; // in kW
        uint256 totalValue; // in SLC tokens
        uint256 availableShares;
        uint256 pricePerShare;
        bool isActive;
        address[] investors;
        mapping(address => uint256) investorShares;
    }
    
    // Mapping from token ID to SolarFarm
    mapping(uint256 => SolarFarm) public solarFarms;
    
    // Events
    event SolarFarmCreated(uint256 indexed tokenId, string name, uint256 totalValue);
    event SharesPurchased(uint256 indexed tokenId, address indexed investor, uint256 shares);
    event SharesSold(uint256 indexed tokenId, address indexed investor, uint256 shares);
    event RevenueDistributed(uint256 indexed tokenId, uint256 amount);
    
    constructor(address _slcToken) ERC721("Solar Farm Fraction", "SFF") Ownable(msg.sender) {
        slcToken = SolarCrowdinToken(_slcToken);
    }
    
    // Create a new solar farm
    function createSolarFarm(
        string memory _name,
        string memory _location,
        uint256 _totalCapacity,
        uint256 _totalValue,
        uint256 _pricePerShare
    ) external onlyOwner returns (uint256) {
        require(_totalValue > 0, "Total value must be greater than 0");
        require(_pricePerShare > 0, "Price per share must be greater than 0");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        SolarFarm storage farm = solarFarms[newTokenId];
        farm.name = _name;
        farm.location = _location;
        farm.totalCapacity = _totalCapacity;
        farm.totalValue = _totalValue;
        farm.availableShares = _totalValue;
        farm.pricePerShare = _pricePerShare;
        farm.isActive = true;
        
        _mint(msg.sender, newTokenId);
        
        emit SolarFarmCreated(newTokenId, _name, _totalValue);
        return newTokenId;
    }
    
    // Purchase shares in a solar farm
    function purchaseShares(uint256 _tokenId, uint256 _shares) external nonReentrant {
        SolarFarm storage farm = solarFarms[_tokenId];
        require(farm.isActive, "Solar farm is not active");
        require(_shares > 0, "Must purchase at least 1 share");
        require(_shares <= farm.availableShares, "Not enough shares available");
        
        uint256 totalCost = _shares * farm.pricePerShare;
        require(slcToken.transferFrom(msg.sender, address(this), totalCost), "Token transfer failed");
        
        farm.availableShares -= _shares;
        farm.investorShares[msg.sender] += _shares;
        farm.investors.push(msg.sender);
        
        emit SharesPurchased(_tokenId, msg.sender, _shares);
    }
    
    // Sell shares in a solar farm
    function sellShares(uint256 _tokenId, uint256 _shares) external nonReentrant {
        SolarFarm storage farm = solarFarms[_tokenId];
        require(farm.isActive, "Solar farm is not active");
        require(_shares > 0, "Must sell at least 1 share");
        require(farm.investorShares[msg.sender] >= _shares, "Not enough shares owned");
        
        uint256 totalValue = _shares * farm.pricePerShare;
        farm.availableShares += _shares;
        farm.investorShares[msg.sender] -= _shares;
        
        require(slcToken.transfer(msg.sender, totalValue), "Token transfer failed");
        
        emit SharesSold(_tokenId, msg.sender, _shares);
    }
    
    // Distribute revenue to investors
    function distributeRevenue(uint256 _tokenId, uint256 _amount) external onlyOwner {
        SolarFarm storage farm = solarFarms[_tokenId];
        require(farm.isActive, "Solar farm is not active");
        require(_amount > 0, "Amount must be greater than 0");
        
        uint256 totalShares = farm.totalValue - farm.availableShares;
        require(totalShares > 0, "No shares have been sold");
        
        for (uint256 i = 0; i < farm.investors.length; i++) {
            address investor = farm.investors[i];
            uint256 investorShares = farm.investorShares[investor];
            if (investorShares > 0) {
                uint256 share = (_amount * investorShares) / totalShares;
                if (share > 0) {
                    require(slcToken.transfer(investor, share), "Token transfer failed");
                }
            }
        }
        
        emit RevenueDistributed(_tokenId, _amount);
    }
    
    // Get investor's share balance
    function getInvestorShares(uint256 _tokenId, address _investor) external view returns (uint256) {
        return solarFarms[_tokenId].investorShares[_investor];
    }
    
    // Get solar farm details
    function getSolarFarmDetails(uint256 _tokenId) external view returns (
        string memory name,
        string memory location,
        uint256 totalCapacity,
        uint256 totalValue,
        uint256 availableShares,
        uint256 pricePerShare,
        bool isActive
    ) {
        SolarFarm storage farm = solarFarms[_tokenId];
        return (
            farm.name,
            farm.location,
            farm.totalCapacity,
            farm.totalValue,
            farm.availableShares,
            farm.pricePerShare,
            farm.isActive
        );
    }
    
    // Emergency functions
    function toggleSolarFarm(uint256 _tokenId) external onlyOwner {
        solarFarms[_tokenId].isActive = !solarFarms[_tokenId].isActive;
    }
    
    function emergencyWithdraw(uint256 _tokenId) external onlyOwner {
        uint256 balance = slcToken.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(slcToken.transfer(owner(), balance), "Token transfer failed");
    }
} 