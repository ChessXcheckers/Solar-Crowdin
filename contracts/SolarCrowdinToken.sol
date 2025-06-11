// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SolarCrowdinToken is ERC20, Ownable, Pausable, ReentrancyGuard {
    // Constants
    uint256 public constant TOTAL_SUPPLY = 6_000_000_000 * 10**18; // 6 billion tokens
    uint256 public constant INITIAL_PRICE = 0.05 ether; // $0.05 per token
    
    // State variables
    mapping(address => bool) public isBlacklisted;
    mapping(address => uint256) public stakingBalance;
    uint256 public stakingRewardRate = 5; // 5% APY
    
    // Events
    event TokensStaked(address indexed user, uint256 amount);
    event TokensUnstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event BlacklistUpdated(address indexed account, bool isBlacklisted);
    
    constructor() ERC20("SolarCrowdin", "SLC") Ownable(msg.sender) {
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
    
    // Staking functions
    function stake(uint256 _amount) external nonReentrant notBlacklisted whenNotPaused {
        require(_amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");
        
        _transfer(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;
        
        emit TokensStaked(msg.sender, _amount);
    }
    
    function unstake(uint256 _amount) external nonReentrant notBlacklisted whenNotPaused {
        require(_amount > 0, "Amount must be greater than 0");
        require(stakingBalance[msg.sender] >= _amount, "Insufficient staked balance");
        
        stakingBalance[msg.sender] -= _amount;
        _transfer(address(this), msg.sender, _amount);
        
        emit TokensUnstaked(msg.sender, _amount);
    }
    
    function claimRewards() external nonReentrant notBlacklisted whenNotPaused {
        uint256 stakedAmount = stakingBalance[msg.sender];
        require(stakedAmount > 0, "No tokens staked");
        
        uint256 rewards = calculateRewards(msg.sender);
        require(rewards > 0, "No rewards to claim");
        
        _mint(msg.sender, rewards);
        emit RewardsClaimed(msg.sender, rewards);
    }
    
    function calculateRewards(address _user) public view returns (uint256) {
        uint256 stakedAmount = stakingBalance[_user];
        if (stakedAmount == 0) return 0;
        
        // Simple reward calculation (can be enhanced with time-based rewards)
        return (stakedAmount * stakingRewardRate) / 100;
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