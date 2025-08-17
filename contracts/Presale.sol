// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Presale is Ownable, Pausable, ReentrancyGuard {
    // --- State Variables ---

    IERC20 public sclToken;
    IERC20 public usdcToken;
    IERC20 public usdtToken;

    address payable public projectWallet;
    address payable public developerWallet;

    uint256 public tokenPrice; // Price in USD with 18 decimals
    uint256 public bnbPrice; // Mock price for BNB, should be updated with an oracle

    uint256 public totalTokensSold;
    uint256 public maxTokensForSale;

    mapping(address => uint256) public userPurchases; // In SCL tokens

    // --- Events ---

    event TokenPurchase(address indexed buyer, uint256 sclAmount, uint256 usdAmount, address paymentToken);
    event WalletsUpdated(address indexed projectWallet, address indexed developerWallet);
    event PriceUpdated(uint256 newPrice);

    // --- Constructor ---

    constructor(
        address _sclToken,
        address _usdcToken,
        address _usdtToken,
        address payable _projectWallet,
        address payable _developerWallet,
        uint256 _tokenPrice,
        uint256 _maxTokensForSale
    ) {
        sclToken = IERC20(_sclToken);
        usdcToken = IERC20(_usdcToken);
        usdtToken = IERC20(_usdtToken);
        projectWallet = _projectWallet;
        developerWallet = _developerWallet;
        tokenPrice = _tokenPrice;
        maxTokensForSale = _maxTokensForSale;
        bnbPrice = 300 * 10**18; // Placeholder BNB price, e.g., $300
    }

    // --- Purchase Functions ---

    function buyWithBNB() external payable whenNotPaused nonReentrant {
        require(msg.value > 0, "Presale: BNB amount must be > 0");

        uint256 usdValue = (msg.value * bnbPrice) / 1 ether;
        uint256 tokensToBuy = (usdValue * 10**18) / tokenPrice;

        _processPurchase(msg.sender, tokensToBuy, usdValue, address(0));
        _splitAndSendBNB(msg.value);
    }

    function buyWithTokens(address _paymentToken, uint256 _amount) external whenNotPaused nonReentrant {
        require(_paymentToken == address(usdcToken) || _paymentToken == address(usdtToken), "Presale: Invalid payment token");
        require(_amount > 0, "Presale: Amount must be > 0");

        IERC20 paymentToken = IERC20(_paymentToken);

        // Assuming stablecoins are 1:1 with USD
        uint256 usdValue = _amount;
        uint256 tokensToBuy = (usdValue * 10**18) / tokenPrice;

        _processPurchase(msg.sender, tokensToBuy, usdValue, _paymentToken);

        // Transfer payment tokens from user to this contract first
        require(paymentToken.transferFrom(msg.sender, address(this), _amount), "Presale: Token transfer failed");
        _splitAndSendTokens(paymentToken, _amount);
    }

    // --- Internal Logic ---

    function _processPurchase(address _buyer, uint256 _tokensToBuy, uint256 _usdValue, address _paymentToken) internal {
        require(totalTokensSold + _tokensToBuy <= maxTokensForSale, "Presale: Not enough tokens left for sale");

        totalTokensSold = totalTokensSold + _tokensToBuy;
        userPurchases[_buyer] = userPurchases[_buyer] + _tokensToBuy;

        // Transfer SCL tokens to the buyer
        require(sclToken.transfer(_buyer, _tokensToBuy), "Presale: SCL token transfer failed");

        emit TokenPurchase(_buyer, _tokensToBuy, _usdValue, _paymentToken);
    }

    function _splitAndSendBNB(uint256 amount) internal {
        uint256 developerShare = amount / 10; // 10%
        uint256 projectShare = amount - developerShare; // 90%

        (bool devSuccess, ) = developerWallet.call{value: developerShare}("");
        (bool projSuccess, ) = projectWallet.call{value: projectShare}("");

        require(devSuccess && projSuccess, "Presale: Fund transfer failed");
    }

    function _splitAndSendTokens(IERC20 paymentToken, uint256 amount) internal {
        uint256 developerShare = amount / 10; // 10%
        uint256 projectShare = amount - developerShare; // 90%

        require(paymentToken.transfer(developerWallet, developerShare), "Presale: Dev share transfer failed");
        require(paymentToken.transfer(projectWallet, projectShare), "Presale: Project share transfer failed");
    }

    // --- Admin Functions ---

    function setWallets(address payable _projectWallet, address payable _developerWallet) external onlyOwner {
        require(_projectWallet != address(0) && _developerWallet != address(0), "Presale: Wallets cannot be zero address");
        projectWallet = _projectWallet;
        developerWallet = _developerWallet;
        emit WalletsUpdated(_projectWallet, _developerWallet);
    }

    function setTokenPrice(uint256 _newPrice) external onlyOwner {
        require(_newPrice > 0, "Presale: Price must be > 0");
        tokenPrice = _newPrice;
        emit PriceUpdated(_newPrice);
    }

    function setBnbPrice(uint256 _newBnbPrice) external onlyOwner {
        bnbPrice = _newBnbPrice;
    }

    function startSale() external onlyOwner {
        _unpause();
    }

    function pauseSale() external onlyOwner {
        _pause();
    }

    function withdrawRemainingSCL() external onlyOwner {
        uint256 remaining = sclToken.balanceOf(address(this));
        if (remaining > 0) {
            require(sclToken.transfer(owner(), remaining), "Presale: SCL withdrawal failed");
        }
    }
}
