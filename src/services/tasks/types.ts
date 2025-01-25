export enum TaskType {
  TON_PROMOTE = "ton_promote",
  STORIES_REPLY = "stories_reply",
  ADD_TO_HOME = "add_to_home",
  SOCIAL_SUB = "social_sub",
  EMOJI_SET = "emoji_set",
  DONATE = "donate",
  WALLET_CONNECT = "wallet_connect",
  BOOST_CHANNEL = "boost_channel",
}

export enum TaskStatus {
  AVAILABLE = "available",
  COMPLETED = "completed",
}

export enum TaskRewardType {
  COINS = "coins",
  CHEST = "chest",
}

export interface ITask {
  id: string;
  title: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  type: TaskType;
  status: string;
  value: null | number;
  reward: [
    {
      type: TaskRewardType;
      value: number;
    },
    {
      type: TaskRewardType;
      value: number;
    },
  ];
  penalty: {
    type: string;
    value: number;
  }[];
}

export interface ITasks {
  everyday: ITask[];
  other: ITask[];
}
