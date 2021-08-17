import { utils } from 'ethers';

export = (seed: number) => ({
  blockNumber: seed,
  transactionHash: utils.id(`${seed}`),
  firstDiceRoll: seed,
  order: [1, 0, 0, 0, 0, 0, 0, 0, 0],
  orderPrice: seed,
  prevTotalOrderSum: seed,
  tokenReward: seed,
  tokenRewardDistributions: [{
    sumStart: 0,
    reward: seed,
  }],
});
