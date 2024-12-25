import { RewardType } from "./components/assignments-list/types";

export const ASSIGNMENTS_LIST = [
  {
    id: "1",
    icon: "COIN" as const,
    title: "Promote TON blockchain",
    rewards: [
      {
        type: RewardType.COIN,
        count: 50000,
      },
      {
        type: RewardType.CHEST,
        count: 1,
      },
    ],
  },
  {
    id: "2",
    icon: "STAR" as const,
    title: "Подпишитесь на Telegram",
    rewards: [
      {
        type: RewardType.COIN,
        count: 50000,
      },
      {
        type: RewardType.CHEST,
        count: 1,
      },
    ],
  },
  {
    id: "3",
    icon: "THUNDER" as const,
    title: "Поделиться в Telegram Stories",
    rewards: [
      {
        type: RewardType.COIN,
        count: 50000,
      },
      {
        type: RewardType.CHEST,
        count: 1,
      },
    ],
  },
  {
    id: "4",
    icon: "TELEGRAM" as const,
    title: "Добавить игру на экран телефона",
    rewards: [
      {
        type: RewardType.COIN,
        count: 50000,
      },
      {
        type: RewardType.CHEST,
        count: 1,
      },
    ],
  },
  {
    id: "5",
    icon: "COIN" as const,
    title: "Добавить Majestic в эмодзи статус",
    rewards: [
      {
        type: RewardType.COIN,
        count: 250000,
      },
      {
        type: RewardType.CHEST,
        count: 3,
      },
    ],
  },
  {
    id: "6",
    icon: "COIN" as const,
    title: "Задание 6",
    rewards: [
      {
        type: RewardType.COIN,
        count: 50000,
      },
      {
        type: RewardType.CHEST,
        count: 1,
      },
    ],
  },
];
