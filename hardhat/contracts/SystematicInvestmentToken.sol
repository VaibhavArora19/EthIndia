// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20Plugins} from "@1inch/token-plugins/contracts/ERC20Plugins.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract SystematicInvestmentToken is ERC20Plugins, Ownable {
    IERC20 immutable usdc;

    constructor(
        uint256 maxPluginsPerAccount,
        uint256 pluginCallGasLimit,
        IERC20 _usdc
    )
        ERC20("SystematicInvestmentToken", "SIT")
        ERC20Plugins(maxPluginsPerAccount, pluginCallGasLimit)
    {
        usdc = _usdc;
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    function mint(address account, uint amount, uint timestamp) external {
        require(
            usdc.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        _mint(account, amount);
    }

    function swapTokens(
        address token,
        address _swapper,
        uint amount,
        bytes memory data
    ) external payable onlyOwner {
        IERC20(token).approve(_swapper, amount);
        (bool sent, ) = _swapper.call{value: msg.value}(data);
        require(sent, "Failed swapping");
    }

    receive() external payable {}
}
