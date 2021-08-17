import app from 'app';
import { MilestoneResource, milestoneSubBrackets } from '../../domains/milestone';

const { config: { milestones } } = app;

type MilestoneDistribution = {
  sumStart: number;
  sumEnd: number;
  reward: number;
};

type RewardDistribution = {
  sumStart: number;
  sum: number;
  part: number;
  reward: number;
};

let milestoneDistributions: MilestoneDistribution[];

export function getMilestoneDistributions(): MilestoneDistribution[] {
  if (!milestoneDistributions) {
    let milestoneStart = 0;
    milestoneDistributions = milestones.reduce(
      (result, milestone) => {
        const milestoneNetSum = 100 * milestone.sum - milestoneStart;
        let milestoneSubBracketStart = milestoneStart;
        let milestoneSubBracketSumAccum = 0;
        let rewardAccum = 0;
        milestoneSubBrackets.forEach((milestoneSubBracket, milestoneSubBracketIdx) => {
          const isLastSubBracket = milestoneSubBracketIdx === milestoneSubBrackets.length - 1;
          const milestoneSubBracketSum = (
            !isLastSubBracket
              ? Math.round((milestoneNetSum) / 3)
              : milestoneNetSum - milestoneSubBracketSumAccum
          );
          const milestoneSubBracketEnd = milestoneSubBracketStart + milestoneSubBracketSum;
          const reward = !isLastSubBracket
            ? Math.round(milestoneSubBracket * milestone.reward)
            : milestone.reward - rewardAccum;
          result.push({
            sumStart: milestoneSubBracketStart / 100,
            sumEnd: milestoneSubBracketEnd / 100,
            reward,
          });
          rewardAccum += reward;
          milestoneSubBracketSumAccum += milestoneSubBracketSum;
          milestoneSubBracketStart = milestoneSubBracketEnd;
        });

        milestoneStart = 100 * milestone.sum;
        return result;
      },
      <MilestoneDistribution[]>[],
    );
  }
  return milestoneDistributions;
}

export function getExtendedMilestoneConfigs(
  totalOrderSum: number,
): MilestoneResource[] {
  const result: MilestoneResource[] = milestones.map(
    (milestone) => ({ ...milestone, isReached: milestone.sum <= totalOrderSum }),
  );
  const currentMilestoneIdx = result.findIndex(
    (milestone) => totalOrderSum < milestone.sum,
  );
  if (currentMilestoneIdx >= 0) {
    result[currentMilestoneIdx].isCurrent = true;
    const lastReachedIdx = currentMilestoneIdx - 1;
    if (lastReachedIdx >= 0) {
      result[lastReachedIdx].isLastReached = true;
    }
  }
  return result;
}

export function getRewardDistributions(
  startingSum: number,
  orderSum: number,
): RewardDistribution[] {
  let distributingSum = orderSum;
  let matchFound = false;
  return getMilestoneDistributions().map((milestoneDistribution) => {
    if (
      !matchFound
      && startingSum >= milestoneDistribution.sumStart
      && startingSum < milestoneDistribution.sumEnd
    ) {
      matchFound = true;
    }

    const { sumStart } = milestoneDistribution;
    let sum: number;
    let part: number;
    let reward: number;

    if (matchFound && distributingSum > 0) {
      const milestoneDistributionNetSum = milestoneDistribution.sumEnd
        - milestoneDistribution.sumStart;
      const milestoneDistributionRestSum = milestoneDistribution.sumEnd
        - (startingSum > milestoneDistribution.sumStart
          ? startingSum
          : milestoneDistribution.sumStart
        );
      sum = (distributingSum < milestoneDistributionRestSum)
        ? distributingSum
        : milestoneDistributionRestSum;
      part = sum / milestoneDistributionNetSum;
      reward = part * milestoneDistribution.reward;
      distributingSum -= sum;
    } else {
      sum = 0;
      part = 0;
      reward = 0;
    }
    return {
      sumStart,
      sum,
      part,
      reward,
    };
  });
}
