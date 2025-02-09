import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";

import {
  useGetAllAppsHeroes,
  useGetAllHeroes,
} from "@/services/heroes/queries";
import { HeroId, IHeroConfig, ISelectedHero } from "@/services/heroes/types";
import { useGetProfile } from "@/services/profile/queries";

type HeroesContextSelection = {
  hero?: ISelectedHero;
};

type HeroesContextValue = {
  currentHero?: ISelectedHero;
  selection: HeroesContextSelection;
  selectHero: (hero: HeroId) => void;
};

const DEFAULT_VALUE = {
  currentHero: undefined,
  selection: {
    hero: undefined,
  },
  selectHero: () => {},
};

export const HeroesContext = createContext<HeroesContextValue>(DEFAULT_VALUE);

const toSelectedHero = (
  heroId: HeroId,
  config: IHeroConfig,
): ISelectedHero => ({
  characterId: heroId,
  earn_per_hour: config.earn_per_hour,
  earn_per_tap: config.earn_per_tap,
  energy: config.energy,
  rarity: config.rarity,
  price: config.price,
  currency: config.currency,
  auto: 0,
  background: 0,
  chain: 0,
  glass: 0,
  hat: 0,
  kit: 0,
  watch: 0,
});

export const HeroesProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { data: profile } = useGetProfile();
  const { data: allHeroes } = useGetAllAppsHeroes();
  const currentProfileHero = profile?.character;

  useGetAllHeroes();

  const [selection, setSelection] = useState<HeroesContextSelection>({
    hero: undefined,
  });

  const value = useMemo(() => {
    if (currentProfileHero && allHeroes) {
      const hero = currentProfileHero
        ? toSelectedHero(
            currentProfileHero.current,
            allHeroes[currentProfileHero.current],
          )
        : undefined;

      return {
        currentHero: hero,
        selection: {
          ...selection,
          hero: selection.hero ?? hero,
        },
        selectHero: (heroId: HeroId) =>
          setSelection((prevSelection) => ({
            ...prevSelection,
            hero: toSelectedHero(heroId, allHeroes[heroId]),
          })),
      };
    }

    return DEFAULT_VALUE;
  }, [currentProfileHero, selection, allHeroes]);

  return (
    <HeroesContext.Provider value={value}>{children}</HeroesContext.Provider>
  );
};
