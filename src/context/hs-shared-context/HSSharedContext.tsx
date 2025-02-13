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
  useGetAllHeroesWithCloth,
} from "@/services/heroes/queries";
import {
  HeroClothPiece,
  HeroCurrency,
  HeroId,
  IHeroConfig,
  ISelectedHero,
  SelectedCloth,
} from "@/services/heroes/types";
import { useGetProfile } from "@/services/profile/queries";

type HSSharedContextSelection = {
  hero?: ISelectedHero;
  cloth?: {
    id: number;
    clothPiece: HeroClothPiece;
    currency: HeroCurrency;
    price: number;
  };
};

type HSSharedContextValue = {
  currentHero?: ISelectedHero;
  selection: HSSharedContextSelection;
  currentClothByHeroId: Record<HeroId, SelectedCloth> | null;
  selectHero: (hero: HeroId) => void;
  selectCloth: (clothPiece: HeroClothPiece, clothId: number) => void;
};

const DEFAULT_VALUE = {
  currentHero: undefined,
  selection: {
    hero: undefined,
    cloth: undefined,
  },
  currentClothByHeroId: null,
  selectHero: () => {},
  selectCloth: () => {},
};

export const HSSharedContext =
  createContext<HSSharedContextValue>(DEFAULT_VALUE);

const toSelectedHero = (
  heroId: HeroId,
  config: IHeroConfig,
  clothConfig: SelectedCloth,
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
  cloth: clothConfig,
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
  const { data: allHeroesWithCloth } = useGetAllHeroesWithCloth();
  const currentHeroId = queryHeroId ?? profile?.character?.current;

  useGetAllHeroes();

  const currentClothByHeroId = useMemo<Record<
    HeroId,
    SelectedCloth
  > | null>(() => {
    if (!allHeroes || !allHeroesWithCloth) return null;

    return (Object.keys(allHeroes) as HeroId[]).reduce(
      (result, heroId) => {
        const heroWithCurrentCloth = allHeroesWithCloth.characters.find(
          (hero) => hero.characterId === heroId,
        );

        let currentCloth: SelectedCloth;

        if (heroWithCurrentCloth) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { characterId, ...cloth } = heroWithCurrentCloth;

          currentCloth = cloth;
        } else {
          currentCloth = Object.fromEntries(
            Object.keys(allHeroes[heroId].cloth).map((key) => [key, 0]),
          ) as SelectedCloth;
        }

        return {
          ...result,
          [heroId]: Object.fromEntries(
            Object.entries(currentCloth).filter(
              ([cloth]) => allHeroes[heroId].cloth[cloth as HeroClothPiece],
            ),
          ),
        };
      },
      {} as Record<HeroId, SelectedCloth>,
    );
  }, [allHeroes, allHeroesWithCloth]);

  const [selection, setSelection] = useState<HSSharedContextSelection>(
    DEFAULT_VALUE.selection,
  );

  const selectHero = useCallback(
    (heroId: HeroId) => {
      if (!allHeroes || !currentClothByHeroId) return;

      setSelection((prevSelection) => {
        return {
          ...prevSelection,
          hero: toSelectedHero(
            heroId,
            allHeroes[heroId],
            currentClothByHeroId[heroId],
          ),
        };
      });
    },
    [allHeroes, currentClothByHeroId],
  );

  const selectCloth = useCallback(
    (clothPiece: HeroClothPiece, clothId: number) => {
      if (!allHeroes || !currentHeroId || !currentClothByHeroId) return;

      setSelection((prevSelection) => {
        const prevHero =
          prevSelection.hero ??
          toSelectedHero(
            currentHeroId,
            allHeroes[currentHeroId],
            currentClothByHeroId[currentHeroId],
          );

        const heroConfig = allHeroes[prevHero.characterId];

        return {
          ...prevSelection,
          hero: setHeroCloth(prevHero, clothPiece, clothId, heroConfig),
          cloth: {
            id: clothId,
            clothPiece,
            currency:
              heroConfig.cloth[clothPiece]?.[clothId]?.currency ??
              HeroCurrency.COINS,
            price: heroConfig.cloth[clothPiece]?.[clothId]?.price ?? 0,
          },
        };
      });
    },
    [allHeroes, currentHeroId, currentClothByHeroId],
  );

  const value = useMemo(() => {
    if (currentHeroId && allHeroes && currentClothByHeroId) {
      const hero = currentHeroId
        ? toSelectedHero(
            currentHeroId,
            allHeroes[currentHeroId],
            currentClothByHeroId[currentHeroId],
          )
        : undefined;

      return {
        currentHero: hero,
        selection: {
          ...selection,
          hero: selection.hero ?? hero,
        },
        currentClothByHeroId,
        selectHero,
        selectCloth,
      };
    }

    return DEFAULT_VALUE;
  }, [
    currentHeroId,
    selection,
    allHeroes,
    currentClothByHeroId,
    selectHero,
    selectCloth,
  ]);

  return (
    <HSSharedContext.Provider value={value}>
      {children}
    </HSSharedContext.Provider>
  );
};
