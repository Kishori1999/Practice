export interface MilestoneConfig {
  sum: number;
  label: string;
  reward: number;
}

export interface MilestoneResource extends MilestoneConfig {
  isReached: boolean;
  isLastReached?: boolean;
  isCurrent?: boolean;
}

export const milestoneSubBrackets = [
  0.385,
  0.33,
  0.285,
];
