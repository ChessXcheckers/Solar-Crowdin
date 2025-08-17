// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract SolarCrowdinToken is ERC20, Ownable, Pausable, ReentrancyGuard {
    // Constants
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    
    // State variables
    mapping(address => bool) public isBlacklisted;
    
    // Events
    event BlacklistUpdated(address indexed account, bool isBlacklisted);
    
    constructor() ERC20("SolarCrowdin", "SCL") Ownable(msg.sender) {
        _mint(msg.sender, TOTAL_SUPPLY);
    }
    
    // Modifiers
    modifier notBlacklisted() {
        require(!isBlacklisted[msg.sender], "Address is blacklisted");
        _;
    }
    
    // Core functions
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    function blacklist(address _account, bool _isBlacklisted) external onlyOwner {
        isBlacklisted[_account] = _isBlacklisted;
        emit BlacklistUpdated(_account, _isBlacklisted);
    }
    
    // Override transfer functions to include blacklist check
    function transfer(address to, uint256 amount) 
        public 
        override 
        notBlacklisted 
        whenNotPaused 
        returns (bool) 
    {
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) 
        public 
        override 
        notBlacklisted 
        whenNotPaused 
        returns (bool) 
    {
        return super.transferFrom(from, to, amount);
    }
    
    // Emergency functions
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        _transfer(address(this), owner(), balance);
    }
} 