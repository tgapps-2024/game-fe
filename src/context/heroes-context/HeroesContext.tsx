import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";

import { useGetAllAppsHeroes, useGetHero } from "@/services/heroes/queries";
import { HeroId, IHeroConfig, ISelectedHero } from "@/services/heroes/types";

type HeroesContextSelection = {
  hero?: ISelectedHero;
};

type HeroesContextValue = {
  currentHero?: ISelectedHero;
  isHeroLoading: boolean;
  selection: HeroesContextSelection;

  selectHero: (hero: HeroId) => void;
};

const DEFAULT_VALUE = {
  currentHero: undefined,
  isHeroLoading: true,
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
  const { data: currentHero, isFetching: isCurrentHeroLoading } = useGetHero();
  const { data: allHeroes, isFetching: isAllHeroesFetching } =
    useGetAllAppsHeroes();
  const [selection, setSelection] = useState<HeroesContextSelection>({
    hero: undefined,
  });

  const value = useMemo(() => {
    if (currentHero && allHeroes) {
      const hero = currentHero
        ? toSelectedHero(currentHero.current, allHeroes[currentHero.current])
        : undefined;

      return {
        currentHero: hero,
        isHeroLoading: isCurrentHeroLoading || isAllHeroesFetching,
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
    } else {
      return DEFAULT_VALUE;
    }
  }, [
    currentHero,
    isCurrentHeroLoading,
    isAllHeroesFetching,
    selection,
    allHeroes,
  ]);

  return (
    <HeroesContext.Provider value={value}>{children}</HeroesContext.Provider>
  );
};
