import React from "react";

import { OverscrollBehavior, PageWrapper } from "@/components/common";
import { HeroesProvider } from "@/context/heroes-context/HeroesContext";

import { HeroesGrid } from "./components/heroes-grid/HeroesGrid";
import { HeroesProfile } from "./components/heroes-profile/HeroesProfile";

export const Heroes = () => (
  <PageWrapper
    overscrollBehaviour={OverscrollBehavior.NONE}
    disableSafeAreaInset
  >
    <HeroesProvider>
      <HeroesProfile />
      <HeroesGrid />
    </HeroesProvider>
  </PageWrapper>
);
