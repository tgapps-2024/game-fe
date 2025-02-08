export enum RewardsStatusEnum {
  OK = "Ok",
}

export enum UpgradeBoosterType {
  CAPACITY = "capacity",
  RECOVERY = "recovery",
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

export type FullBooster = {
  amount: number;
  nextRestore: number;
  fullRestore: number;
};

export type TempEnergyBooster = {
  amount: number;
  end: number;
};

export type CapacityBooster = {
  level: number;
  price: number;
  currence: string;
  current: number;
  new: number;
};

export type RecoveryBooster = {
  level: number;
  price: number;
  currence: string;
  current: number;
  new: number;
};

export interface IBoosters {
  full: FullBooster;
  temp_energy: TempEnergyBooster;
  capacity: CapacityBooster;
  recovery: RecoveryBooster;
}
