// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TokenVesting
 * @dev A token holder contract that can release its token balance gradually like a
 * typical vesting scheme, with a cliff and vesting period. Optionally revocable.
 * Based on OpenZeppelin's VestingWallet.
 */
contract TokenVesting is Ownable {
    // beneficiary of tokens after they are released
    address private _beneficiary;

    uint256 private _cliff;
    uint256 private _start;
    uint256 private _duration;
    bool private _revocable;

    mapping(address => uint256) private _released;

    event TokensReleased(address indexed token, uint256 amount);
    event VestingRevoked(address indexed token);

    /**
     * @dev Creates a vesting contract that vests tokens gradually over a time period.
     * @param beneficiary_ address of the beneficiary to whom vested tokens are transferred
     * @param start_ timestamp when vesting starts
     * @param cliffDuration_ duration in seconds of the cliff period
     * @param duration_ duration in seconds of the period in which the tokens will vest
     * @param revocable_ whether the vesting is revocable or not
     */
    constructor(
        address beneficiary_,
        uint256 start_,
        uint256 cliffDuration_,
        uint256 duration_,
        bool revocable_
    ) {
        require(beneficiary_ != address(0), "TokenVesting: beneficiary is the zero address");
        _beneficiary = beneficiary_;
        _start = start_;
        _cliff = start_ + cliffDuration_;
        _duration = duration_;
        _revocable = revocable_;
    }

    /**
     * @return the beneficiary of the vesting.
     */
    function beneficiary() public view returns (address) {
        return _beneficiary;
    }

    /**
     * @return the cliff time of the vesting.
     */
    function cliff() public view returns (uint256) {
        return _cliff;
    }

    /**
     * @return the start time of the vesting.
     */
    function start() public view returns (uint256) {
        return _start;
    }

    /**
     * @return the duration of the vesting.
     */
    function duration() public view returns (uint256) {
        return _duration;
    }

    /**
     * @return true if the vesting is revocable.
     */
    function revocable() public view returns (bool) {
        return _revocable;
    }

    /**
     * @return the amount of the token released.
     */
    function released(address token) public view returns (uint256) {
        return _released[token];
    }

    /**
     * @notice Revokes the vesting schedule for a token if the vesting is revocable.
     * @param token ERC20 token which is being vested
     */
    function revoke(address token) public onlyOwner {
        require(_revocable, "TokenVesting: vesting is not revocable");

        IERC20 erc20 = IERC20(token);
        uint256 balance = erc20.balanceOf(address(this));

        uint256 unreleased = balance - released(token);
        _released[token] = _released[token] + unreleased;

        erc20.transfer(owner(), unreleased);

        emit VestingRevoked(token);
    }

    /**
     * @notice Release vested amount of a token.
     * @param token ERC20 token which is being vested
     */
    function release(address token) public {
        uint256 releasable = vestedAmount(token, uint256(block.timestamp));

        require(releasable > 0, "TokenVesting: no tokens are due");

        uint256 releasedAmount = _released[token];
        uint256 amountToRelease = releasable - releasedAmount;

        _released[token] = releasedAmount + amountToRelease;

        IERC20(token).transfer(_beneficiary, amountToRelease);

        emit TokensReleased(token, amountToRelease);
    }

    /**
     * @dev Calculates the amount of tokens that has already vested.
     * @param token ERC20 token which is being vested
     * @param timestamp The current time
     */
    function vestedAmount(address token, uint256 timestamp) public view returns (uint256) {
        uint256 totalBalance = IERC20(token).balanceOf(address(this));
        return _vestingSchedule(totalBalance, timestamp);
    }

    /**
     * @dev Calculates the amount of tokens that has already vested.
     * @param totalAllocation Total amount of tokens to be vested
     * @param timestamp The current time
     */
    function _vestingSchedule(uint256 totalAllocation, uint256 timestamp) internal view returns (uint256) {
        if (timestamp < _cliff) {
            return 0;
        } else if (timestamp >= _start + _duration) {
            return totalAllocation;
        } else {
            return (totalAllocation * (timestamp - _start)) / _duration;
        }
    }
}
