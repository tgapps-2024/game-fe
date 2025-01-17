export enum RewardsStatusEnum {
  OK = "Ok",
}

export interface IRewardsEarn {
  reward: number;
  status: RewardsStatusEnum;
}
