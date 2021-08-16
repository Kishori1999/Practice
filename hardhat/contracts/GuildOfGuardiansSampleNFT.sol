// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./interfaces/Mintable.sol";

// import "@openzeppelin/contracts/access/AccessControl.sol";

contract GuildOfGuardiansSampleNFT is ERC721, Mintable {
    event MintFor(address _to, uint256 _amount);

    constructor() ERC721("GuildOfGuardiansSampleNFT", "GOGS") {
        //TODO Initialise access
        // _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function mintFor(
        address to,
        uint256 amount,
        bytes memory mintingBlob
    ) external override {
        //TODO Add access control for minting:
        // require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not admin");
        emit MintFor(to, amount);
    }
}
