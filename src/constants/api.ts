export const API_ENDPOINTS = {
  API: {
    LOGIN: "/api/login",
  },
  GET: {
    GET_PROFILE: "/get_profile",
    GET_OFFLINE_REWARD: "/get_offline_reward",
    CONFIRM_GET_OFFLINE_REWARD: "/confirm_get_offline_reward",
    GET_TASKS: "/get_tasks",
    GET_BOOSTERS: "/get_boosters",
    CLICKER: "/clicker",
    GET_BATTLEPASS: "/get_battlepass",
    GET_REFERALS: "/get_referals",
    GET_REWARDS_EARN: "/get_referals_earn",
    GET_DAILY_INFO: "/get_daily_info",
    GET_DAILY_REWARD: "/get_daily_reward",
    GET_HERO: "/get_character",
    GET_ALL_HEROES: '/get_all_characters',
    GET_ALL_APPS_HEROES: '/get_all_apps_characters'
  },
  POST: {
    AUTH: "/auth",
    UPGRADE_CARD: "/upgrade_card",
    SET_TASK_COMPLETE: "/set_task_complete",
    GET_REWARD_FROM_BATTLEPASS: "/get_reward_from_battlepass",
    STARS_PAYMENT: "/stars_payment",
  },
};

export const AUTH_COOKIE_TOKEN = "authToken";

export const STALE_TIME = 1000 * 60 * 60; // 1 час
