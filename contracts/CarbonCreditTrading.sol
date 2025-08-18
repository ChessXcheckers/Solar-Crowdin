// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/structs/Counters.sol";
import "./SolarCrowdinToken.sol";

contract CarbonCreditTrading is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    SolarCrowdinToken public slcToken;
    
    struct CarbonCredit {
        string projectId;
        string verificationStandard;
        uint256 amount; // in metric tons of CO2
        uint256 price; // in SLC tokens per ton
        address seller;
        bool isVerified;
        bool isActive;
        uint256 timestamp;
    }
    
    // Mapping from token ID to CarbonCredit
    mapping(uint256 => CarbonCredit) public carbonCredits;
    
    // Mapping for verification authorities
    mapping(address => bool) public isVerifier;
    
    // Events
    event CarbonCreditCreated(uint256 indexed tokenId, string projectId, uint256 amount);
    event CarbonCreditVerified(uint256 indexed tokenId, address verifier);
    event CarbonCreditPurchased(uint256 indexed tokenId, address buyer, uint256 amount);
    event CarbonCreditRetired(uint256 indexed tokenId, address retirer, uint256 amount);
    
    constructor(address _slcToken) ERC721("Carbon Credit", "CC") Ownable(msg.sender) {
        slcToken = SolarCrowdinToken(_slcToken);
    }
    
    // Modifiers
    modifier onlyVerifier() {
        require(isVerifier[msg.sender], "Not authorized verifier");
        _;
    }
    
    // Add/remove verifier
    function setVerifier(address _verifier, bool _isVerifier) external onlyOwner {
        isVerifier[_verifier] = _isVerifier;
    }
    
    // Create a new carbon credit
    function createCarbonCredit(
        string memory _projectId,
        string memory _verificationStandard,
        uint256 _amount,
        uint256 _price
    ) external returns (uint256) {
        require(_amount > 0, "Amount must be greater than 0");
        require(_price > 0, "Price must be greater than 0");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        CarbonCredit storage credit = carbonCredits[newTokenId];
        credit.projectId = _projectId;
        credit.verificationStandard = _verificationStandard;
        credit.amount = _amount;
        credit.price = _price;
        credit.seller = msg.sender;
        credit.isVerified = false;
        credit.isActive = true;
        credit.timestamp = block.timestamp;
        
        _mint(msg.sender, newTokenId);
        
        emit CarbonCreditCreated(newTokenId, _projectId, _amount);
        return newTokenId;
    }
    
    // Verify a carbon credit
    function verifyCarbonCredit(uint256 _tokenId) external onlyVerifier {
        CarbonCredit storage credit = carbonCredits[_tokenId];
        require(!credit.isVerified, "Credit already verified");
        require(credit.isActive, "Credit is not active");
        
        credit.isVerified = true;
        emit CarbonCreditVerified(_tokenId, msg.sender);
    }
    
    // Purchase a carbon credit
    function purchaseCarbonCredit(uint256 _tokenId, uint256 _amount) external nonReentrant {
        CarbonCredit storage credit = carbonCredits[_tokenId];
        require(credit.isVerified, "Credit not verified");
        require(credit.isActive, "Credit is not active");
        require(_amount > 0 && _amount <= credit.amount, "Invalid amount");
        
        uint256 totalCost = _amount * credit.price;
        require(slcToken.transferFrom(msg.sender, credit.seller, totalCost), "Token transfer failed");
        
        credit.amount -= _amount;
        if (credit.amount == 0) {
            credit.isActive = false;
        }
        
        emit CarbonCreditPurchased(_tokenId, msg.sender, _amount);
    }
    
    // Retire a carbon credit (permanent removal from circulation)
    function retireCarbonCredit(uint256 _tokenId, uint256 _amount) external nonReentrant {
        CarbonCredit storage credit = carbonCredits[_tokenId];
        require(credit.isVerified, "Credit not verified");
        require(credit.isActive, "Credit is not active");
        require(_amount > 0 && _amount <= credit.amount, "Invalid amount");
        
        credit.amount -= _amount;
        if (credit.amount == 0) {
            credit.isActive = false;
        }
        
        emit CarbonCreditRetired(_tokenId, msg.sender, _amount);
    }
    
    // Get carbon credit details
    function getCarbonCreditDetails(uint256 _tokenId) external view returns (
        string memory projectId,
        string memory verificationStandard,
        uint256 amount,
        uint256 price,
        address seller,
        bool isVerified,
        bool isActive,
        uint256 timestamp
    ) {
        CarbonCredit storage credit = carbonCredits[_tokenId];
        return (
            credit.projectId,
            credit.verificationStandard,
            credit.amount,
            credit.price,
            credit.seller,
            credit.isVerified,
            credit.isActive,
            credit.timestamp
        );
    }
    
    // Emergency functions
    function toggleCarbonCredit(uint256 _tokenId) external onlyOwner {
        carbonCredits[_tokenId].isActive = !carbonCredits[_tokenId].isActive;
    }
    
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = slcToken.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(slcToken.transfer(owner(), balance), "Token transfer failed");
    }
} 