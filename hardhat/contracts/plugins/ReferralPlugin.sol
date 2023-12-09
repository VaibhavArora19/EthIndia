// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import {Plugin} from "@1inch/token-plugins/contracts/Plugin.sol";
import {IERC20Plugins} from "@1inch/token-plugins/contracts/interfaces/IERC20Plugins.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../AnonAadhaar/interfaces/IAnonAadhaarVerifier.sol";

contract ReferralPlugin is Plugin, ERC20 {
    address public anonAadhaarVerifierAddr;
    mapping(address => uint) public referralPoints;
    mapping(address => bool) public referrers;
    mapping(address => bool) public referred;

    constructor(
        IERC20Plugins token_,
        address _verifierAddr
    ) ERC20("ReferralSIT", "rSIT") Plugin(token_) {
        anonAadhaarVerifierAddr = _verifierAddr;
    } // solhint-disable-line no-inline-assembly

    function registerReferrer(
        uint256[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[34] calldata _pubSignals
    ) public {
        require(!referrers[msg.sender], "Already Registered");
        require(verify(_pA, _pB, _pC, _pubSignals), "Not Valid");
        referrers[msg.sender] = true;
        if (!token.hasPlugin(msg.sender, address(this))) {
            token.addPlugin(address(this));
        }
    }

    function verifyRefer(
        address referrer,
        uint256[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[34] calldata _pubSignals
    ) public {
        require(!referred[msg.sender], "Already Claimed");
        require(referrers[referrer], "Not a referrer");
        require(verify(_pA, _pB, _pC, _pubSignals), "Not Valid");
        if (!token.hasPlugin(msg.sender, address(this))) {
            token.addPlugin(address(this));
        }
        referralPoints[msg.sender] += 1;
        referralPoints[referrer] += 1;
        referred[msg.sender] = true;
    }

    function _updateBalances(
        address from,
        address to,
        uint256
    ) internal override {
        // whenever user bought SIT tokens.this will mint rSIT tokens based on referral points user have.
        if (from == address(0) && referralPoints[to] > 0) {
            uint _amount = referralPoints[to] * 1e18;
            _mint(to, _amount);
        }
    }

    function verify(
        uint256[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[34] calldata _pubSignals
    ) public view returns (bool) {
        return
            IAnonAadhaarVerifier(anonAadhaarVerifierAddr).verifyProof(
                _pA,
                _pB,
                _pC,
                _pubSignals
            );
    }
}
