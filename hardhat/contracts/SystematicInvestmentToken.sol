// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20Plugins} from "@1inch/token-plugins/contracts/ERC20Plugins.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SystematicInvestmentToken is ERC20Plugins {
    constructor(
        uint256 maxPluginsPerAccount,
        uint256 pluginCallGasLimit
    )
        ERC20("SystematicInvestmentToken", "SIT")
        ERC20Plugins(maxPluginsPerAccount, pluginCallGasLimit)
    {}

    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }
}
