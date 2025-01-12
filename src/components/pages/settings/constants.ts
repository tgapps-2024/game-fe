import { NS } from "@/constants/ns";
import StarCoin from "@/public/assets/svg/star.svg";
import TonCoin from "@/public/assets/svg/ton.svg";

export const PROFILE_BALANCE_ITEMS = ({
  coins,
  stars,
  ton,
}: {
  coins: number;
  stars: number;
  ton: number;
}) => [
  {
    icon: StarCoin,
    tidKey: `${NS.PAGES.SETTINGS.BALANCE.ROOT}.${NS.PAGES.SETTINGS.BALANCE.TITLE}`,
    value: coins,
  },
  {
    icon: StarCoin,
    tidKey: `${NS.PAGES.SETTINGS.BALANCE.ROOT}.${NS.PAGES.SETTINGS.BALANCE.STARS}`,
    value: stars,
  },
  {
    icon: TonCoin,
    tidKey: `${NS.PAGES.SETTINGS.BALANCE.ROOT}.${NS.PAGES.SETTINGS.BALANCE.TON}`,
    value: ton,
  },
];
