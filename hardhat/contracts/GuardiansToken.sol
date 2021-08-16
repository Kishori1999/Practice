pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GuardiansToken is ERC20 {
    constructor() public ERC20("GuardiansTokens", "GOG") {
        _mint(0xe1dCa243A34008dE035998427b58352595C0140B, 10000000 * 10**18);
    }
}
