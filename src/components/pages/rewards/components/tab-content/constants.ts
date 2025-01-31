import { TabsEnum } from "../../enums";

import { BoosterContent } from "./components/booster-content/BoosterContent";
import { EarningsContent } from "./components/earnings-content/EarningsContent";
import { RewardsContent } from "./components/rewards-content/RewardsContent";

type Props = {
  some?: string;
};

export const MAP_COMPONENTS: Record<
  TabsEnum,
  React.FC<React.PropsWithChildren<Props>>
> = {
  [TabsEnum.EARNINGS]: EarningsContent,
  [TabsEnum.REWARDS]: RewardsContent,
  [TabsEnum.BOOSTERS]: BoosterContent,
};
