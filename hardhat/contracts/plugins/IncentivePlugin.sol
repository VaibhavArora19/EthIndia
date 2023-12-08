// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Plugin} from "@1inch/token-plugins/contracts/Plugin.sol";
import {IERC20Plugins} from "@1inch/token-plugins/contracts/interfaces/IERC20Plugins.sol";

contract IncentivePlugin is Plugin {
    constructor(IERC20Plugins token_) Plugin(token_) {} // solhint-disable-line no-empty-blocks

    function _updateBalances(
        address from,
        address to,
        uint256 amount
    ) internal override {
        // TODO after transferring tokens or burning , need to give user all the incentive back we got because of SIT's
    }
}
