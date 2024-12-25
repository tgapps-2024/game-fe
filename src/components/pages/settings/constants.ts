import { NS } from "@/constants/ns";
import StarCoin from "@/public/assets/svg/star.svg";
import TonCoin from "@/public/assets/svg/ton.svg";

export const PROFILE_BALANCE_ITEMS = [
  {
    icon: StarCoin,
    tidKey: `${NS.PAGES.SETTINGS.BALANCE.ROOT}.${NS.PAGES.SETTINGS.BALANCE.TITLE}`,
    value: 1500,
  },
  {
    icon: StarCoin,
    tidKey: `${NS.PAGES.SETTINGS.BALANCE.ROOT}.${NS.PAGES.SETTINGS.BALANCE.STARS}`,
    value: 1000000000,
  },
  {
    icon: TonCoin,
    tidKey: `${NS.PAGES.SETTINGS.BALANCE.ROOT}.${NS.PAGES.SETTINGS.BALANCE.TON}`,
    value: 200,
  },
];
