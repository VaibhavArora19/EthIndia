// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
// Simple plugin
import {Plugin} from "@1inch/token-plugins/contracts/Plugin.sol";
import {IERC20Plugins} from "@1inch/token-plugins/contracts/interfaces/IERC20Plugins.sol";
import "@openzeppelin/contracts/governance/utils/Votes.sol";

contract VotesPlugin is Plugin, Votes {
    constructor(IERC20Plugins token_) EIP712("SIT", "1") Plugin(token_) {} // solhint-disable-line no-empty-blocks

    function _updateBalances(
        address from,
        address to,
        uint256 amount
    ) internal override {
        _transferVotingUnits(from, to, amount);
    }

    function _getVotingUnits(
        address account
    ) internal view virtual override returns (uint256) {
        return token.balanceOf(account);
    }
}
