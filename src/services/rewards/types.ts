export enum RewardsStatusEnum {
  OK = "Ok",
}

export interface IRewardsEarn {
  reward: number;
  status: RewardsStatusEnum;
}

export interface IDailyRewardInfo {
  combo: number;
  available: boolean;
}

export interface IDailyReward {
  reward: string;
  value: string;
  isExist?: boolean;
  coffer: {
    coins: number;
    stars: number;
    buster: null;
    offline: number;
    cloth: null;
    character: {
      value: string;
      isExist: null;
    };
    game_energy: number;
    auto: null;
  };
}
