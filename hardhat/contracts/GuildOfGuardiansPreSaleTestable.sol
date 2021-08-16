pragma solidity >=0.8.0 <0.9.0;

import "./GuildOfGuardiansPreSale.sol";
import "./UniswapV2PairTestable.sol";

contract GuildOfGuardiansPreSaleTestable is GuildOfGuardiansPreSale {
    uint256 blocksMined;

    constructor()
        GuildOfGuardiansPreSale(address(0))
    {
        usdEthPair = new UniswapV2PairTestable(
            58236923444502806606838391,
            2755139645868413700552
        );
        usdEthPairAddress = address(usdEthPair);

        originalStock[uint256(Product.RareHeroPack)] = 100000;
        originalStock[uint256(Product.EpicHeroPack)] = 20000;
        originalStock[uint256(Product.LegendaryHeroPack)] = 4000;
        originalStock[uint256(Product.PetPack)] = 10000;
        originalStock[uint256(Product.EnergyToken)] = 1000;
        originalStock[uint256(Product.BasicGuildToken)] = 500;
        originalStock[uint256(Product.Tier1GuildToken)] = 250;
        originalStock[uint256(Product.Tier2GuildToken)] = 50;
        originalStock[uint256(Product.Tier3GuildToken)] = 10;
        stockAvailable[uint256(Product.RareHeroPack)] = 100000;
        stockAvailable[uint256(Product.EpicHeroPack)] = 20000;
        stockAvailable[uint256(Product.LegendaryHeroPack)] = 4000;
        stockAvailable[uint256(Product.PetPack)] = 10000;
        stockAvailable[uint256(Product.EnergyToken)] = 1000;
        stockAvailable[uint256(Product.BasicGuildToken)] = 500;
        stockAvailable[uint256(Product.Tier1GuildToken)] = 250;
        stockAvailable[uint256(Product.Tier2GuildToken)] = 50;
        stockAvailable[uint256(Product.Tier3GuildToken)] = 10;
    }

    function testingMine() public {
        blocksMined++;
    }

    function testingReceive() public payable {}

    function testingSetStockAvailable(uint256 productId, uint256 value) public {
        stockAvailable[productId] = value;
    }

    function testingSetMythicOwner(uint256 heroType, address newMythicOwner)
        public
    {
        mythicOwner[heroType] = newMythicOwner;
    }

    function testingSetStockFixed(bool _stockFixed) public {
        stockFixed = _stockFixed;
    }

    function testingAddReferrerBonuses(address _referrer, uint256 _amount)
        public
    {
        referrerBonuses[_referrer] += _amount;
    }

    function testDiceWin() public returns (bool) {
        assert(_diceWinRanged(0, 0, 100, 10000) == true);
        assert(_diceWinRanged(10, 0, 100, 10000) == true);
        assert(_diceWinRanged(90, 0, 100, 10000) == true);
        assert(_diceWinRanged(99, 0, 100, 10000) == true);
        assert(_diceWinRanged(100, 0, 100, 10000) == false);
        assert(_diceWinRanged(200, 0, 100, 10000) == false);
        assert(_diceWinRanged(500, 0, 100, 10000) == false);
        assert(_diceWinRanged(1000, 0, 100, 10000) == false);
        assert(_diceWinRanged(2000, 0, 100, 10000) == false);
        assert(_diceWinRanged(3000, 0, 100, 10000) == false);
        assert(_diceWinRanged(4000, 0, 100, 10000) == false);
        assert(_diceWinRanged(5000, 0, 100, 10000) == false);
        assert(_diceWinRanged(6000, 0, 100, 10000) == false);
        assert(_diceWinRanged(6000, 0, 100, 10000) == false);
        assert(_diceWinRanged(7000, 0, 100, 10000) == false);
        assert(_diceWinRanged(8000, 0, 100, 10000) == false);
        assert(_diceWinRanged(9000, 0, 100, 10000) == false);
        assert(_diceWinRanged(10000, 0, 100, 10000) == false);
    }
}
