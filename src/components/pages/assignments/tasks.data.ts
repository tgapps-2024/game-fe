import {
  ITasks,
  TaskRewardType,
  TaskStatus,
  TaskType,
} from "@/services/tasks/types";

export const mockTasks: ITasks = {
  everyday: [
    {
      id: "task_1",
      title: {
        ru: "Продвижение TON",
        en: "TON Promotion",
      },
      description: {
        ru: "Участвуйте в продвижении TON.",
        en: "Participate in TON promotion.",
      },
      type: TaskType.TON_PROMOTE,
      status: TaskStatus.AVAILABLE,
      value: 1000000,
      reward: [
        {
          type: TaskRewardType.COINS,
          value: 500000,
        },
        {
          type: TaskRewardType.CHEST,
          value: 1,
        },
      ],
      penalty: [
        {
          type: "warning",
          value: 10,
        },
      ],
    },
    {
      id: "task_2",
      title: {
        ru: "Ответы на истории",
        en: "Stories Reply",
      },
      description: {
        ru: "Ответьте на истории пользователей.",
        en: "Reply to users' stories.",
      },
      type: TaskType.STORIES_REPLY,
      status: TaskStatus.COMPLETED,
      value: null,
      reward: [
        {
          type: TaskRewardType.COINS,
          value: 30,
        },
        {
          type: TaskRewardType.CHEST,
          value: 0,
        },
      ],
      penalty: [],
    },
  ],
  other: [
    {
      id: "task_3",
      title: {
        ru: "Добавить в домашнюю страницу",
        en: "Add to Home",
      },
      description: {
        ru: "Добавьте элемент на домашнюю страницу.",
        en: "Add an item to the home page.",
      },
      type: TaskType.ADD_TO_HOME,
      status: TaskStatus.AVAILABLE,
      value: 5,
      reward: [
        {
          type: TaskRewardType.COINS,
          value: 20,
        },
        {
          type: TaskRewardType.CHEST,
          value: 1,
        },
      ],
      penalty: [
        {
          type: "timeout",
          value: 15,
        },
      ],
    },
    {
      id: "task_4",
      title: {
        ru: "Подписка на социальные сети",
        en: "Social Subscription",
      },
      description: {
        ru: "Подпишитесь на социальные сети.",
        en: "Subscribe to social networks.",
      },
      type: TaskType.SOCIAL_SUB,
      status: TaskStatus.AVAILABLE,
      value: null,
      reward: [
        {
          type: TaskRewardType.COINS,
          value: 40,
        },
        {
          type: TaskRewardType.CHEST,
          value: 0,
        },
      ],
      penalty: [],
    },
  ],
};
