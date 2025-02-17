import { FC, SVGProps } from "react";

import SilverShieldSVG from "@/public/assets/svg/top-players/gray-shield.svg";
import SaphireShieldSVG from "@/public/assets/svg/top-players/lightblue-shield.svg";
import LockedShieldSVG from "@/public/assets/svg/top-players/locked-shield.svg";
import GoldShieldSVG from "@/public/assets/svg/top-players/yellow-shield.svg";

import { LeagueTypeEnum } from "../../types";

type ShieldSVG = FC<SVGProps<SVGSVGElement>>;

export const LEAGUE_TYPES: Record<LeagueTypeEnum, ShieldSVG> = {
  [LeagueTypeEnum.SILVER]: SilverShieldSVG,
  [LeagueTypeEnum.GOLD]: GoldShieldSVG,
  [LeagueTypeEnum.SAPHIRE]: SaphireShieldSVG,
  [LeagueTypeEnum.DIAMOND]: LockedShieldSVG,
  [LeagueTypeEnum.PLATINUM]: LockedShieldSVG,
};
