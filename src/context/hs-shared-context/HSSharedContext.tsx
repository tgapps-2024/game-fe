import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/router";

import {
  useGetAllAppsHeroes,
  useGetAllHeroes,
} from "@/services/heroes/queries";
import {
  HeroClothPiece,
  HeroId,
  IHeroConfig,
  ISelectedHero,
  SelectedCloth,
} from "@/services/heroes/types";
import { useGetProfile } from "@/services/profile/queries";

type HSSharedContextSelection = {
  hero?: ISelectedHero;
};

type HSSharedContextValue = {
  currentHero?: ISelectedHero;
  selection: HSSharedContextSelection;
  selectHero: (hero: HeroId) => void;
  selectCloth: (clothPiece: HeroClothPiece, clothId: number) => void;
};

const DEFAULT_VALUE = {
  currentHero: undefined,
  selection: {
    hero: undefined,
  },
  selectHero: () => {},
  selectCloth: () => {},
};

export const HSSharedContext =
  createContext<HSSharedContextValue>(DEFAULT_VALUE);

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
  cloth: Object.fromEntries(
    Object.entries(config.cloth)
      .filter(([, config]) => !!config)
      .map(([key]) => [key, 0]),
  ) as SelectedCloth,
});

const numOrZero = (num?: number) => num ?? 0;

const setHeroCloth = (
  hero: ISelectedHero,
  clothPiece: HeroClothPiece,
  clothId: number,
  heroConfig: IHeroConfig,
): ISelectedHero => {
  const clothPieceConfig = heroConfig.cloth[clothPiece];
  const prevClothConfig = clothPieceConfig?.[hero.cloth[clothPiece]];
  const nextClothConfig = clothPieceConfig?.[clothId];

  return {
    ...hero,
    cloth: {
      ...hero.cloth,
      [clothPiece]: clothId,
    },
    earn_per_hour:
      hero.earn_per_hour -
      numOrZero(prevClothConfig?.earn_per_hour) +
      numOrZero(nextClothConfig?.earn_per_hour),
    earn_per_tap:
      hero.earn_per_tap -
      numOrZero(prevClothConfig?.earn_per_tap) +
      numOrZero(nextClothConfig?.earn_per_tap),
    energy:
      hero.energy -
      numOrZero(prevClothConfig?.energy) +
      numOrZero(nextClothConfig?.energy),
  };
};

const parseQueryHeroId = (
  queryHeroId?: string | string[],
): HeroId | undefined => {
  if (!queryHeroId) return undefined;
  return (Array.isArray(queryHeroId) ? queryHeroId[0] : queryHeroId) as HeroId;
};

export const HSSharedProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { query } = useRouter();
  const queryHeroId = parseQueryHeroId(query.heroId);
  const { data: profile } = useGetProfile();
  const { data: allHeroes } = useGetAllAppsHeroes();
  const currentHeroId = queryHeroId ?? profile?.character?.current;

  useGetAllHeroes();

  const [selection, setSelection] = useState<HSSharedContextSelection>({
    hero: undefined,
  });

  const selectHero = useCallback(
    (heroId: HeroId) => {
      if (!allHeroes) return;

      setSelection((prevSelection) => {
        return {
          ...prevSelection,
          hero: toSelectedHero(heroId, allHeroes[heroId]),
        };
      });
    },
    [allHeroes],
  );

  const selectCloth = useCallback(
    (clothPiece: HeroClothPiece, clothId: number) => {
      if (!allHeroes || !currentHeroId) return;

      setSelection((prevSelection) => {
        const prevHero =
          prevSelection.hero ??
          toSelectedHero(currentHeroId, allHeroes[currentHeroId]);

        return {
          ...prevSelection,
          hero: setHeroCloth(
            prevHero,
            clothPiece,
            clothId,
            allHeroes[prevHero.characterId],
          ),
        };
      });
    },
    [allHeroes, currentHeroId],
  );

  const value = useMemo(() => {
    if (currentHeroId && allHeroes) {
      const hero = currentHeroId
        ? toSelectedHero(currentHeroId, allHeroes[currentHeroId])
        : undefined;

      return {
        currentHero: hero,
        selection: {
          ...selection,
          hero: selection.hero ?? hero,
        },
        selectHero,
        selectCloth,
      };
    }

    return DEFAULT_VALUE;
  }, [currentHeroId, selection, allHeroes, selectHero, selectCloth]);

  return (
    <HSSharedContext.Provider value={value}>
      {children}
    </HSSharedContext.Provider>
  );
};
