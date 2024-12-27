import PrimaryBackground from "@/public/assets/svg/assignments/bg-1.svg";
import SecondaryBackground from "@/public/assets/svg/assignments/bg-2.svg";
import TertiaryBackground from "@/public/assets/svg/assignments/bg-3.svg";

type BackgroundMapType = {
  [key: number]: string;
};

export const MAP_BACKGROUNDS: BackgroundMapType = {
  0: PrimaryBackground,
  1: SecondaryBackground,
  2: TertiaryBackground,
  3: PrimaryBackground,
  4: SecondaryBackground,
};
