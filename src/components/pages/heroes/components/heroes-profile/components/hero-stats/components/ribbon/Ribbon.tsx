import React, { FunctionComponent } from "react";

import { HeroType } from "@/components/pages/heroes/types";

import { EpicRibbon } from "./components/epic-ribbon/EpicRibbon";
import { RareRibbon } from "./components/rare-ribbon/RareRibbon";
import { RegularRibbon } from "./components/regular-ribbon/RegularRibbon";

type Props = {
  heroType: HeroType;
};

export const Ribbon: FunctionComponent<Props> = ({ heroType }) => {
  if (heroType === HeroType.RARE) {
    return <RareRibbon />;
  } else if (heroType === HeroType.EPIC) {
    return <EpicRibbon />;
  }

  return <RegularRibbon />;
};
