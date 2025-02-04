import React, { FunctionComponent, PropsWithChildren } from "react";

import { HeroType } from "@/components/pages/heroes/types";

import { EpicRibbon } from "./components/epic-ribbon/EpicRibbon";
import { RareRibbon } from "./components/rare-ribbon/RareRibbon";
import { RegularRibbon } from "./components/regular-ribbon/RegularRibbon";

type Props = {
  heroType: HeroType;
};

export const Ribbon: FunctionComponent<PropsWithChildren<Props>> = ({
  heroType,
  children,
}) => {
  let RibbonComponent = RegularRibbon;

  if (heroType === HeroType.RARE) {
    RibbonComponent = RareRibbon;
  } else if (heroType === HeroType.EPIC) {
    RibbonComponent = EpicRibbon;
  }

  return (
    <div className="relative">
      <RibbonComponent />
      <div className="absolute inset-0 text-center text-x font-bold leading-4 text-white">
        {children}
      </div>
    </div>
  );
};
