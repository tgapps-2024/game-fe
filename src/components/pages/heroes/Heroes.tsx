import React from "react";

import {
  OverscrollBehavior,
  PageWrapper,
} from "@/components/common";

import { HeroesGrid } from "./components/heroes-grid/HeroesGrid";
import { HeroesProfile } from "./components/heroes-profile/HeroesProfile";

export const Heroes = () => (
  <PageWrapper
    overscrollBehaviour={OverscrollBehavior.NONE}
    disableSafeAreaInset
  >
    <HeroesProfile />
    <HeroesGrid />
  </PageWrapper>
);
