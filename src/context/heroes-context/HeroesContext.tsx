import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";

import { useGetCharacter } from "@/services/heroes/queries";
import { ICharacter } from "@/services/heroes/types";

type HeroesContextSelection = {
  hero?: ICharacter;
};

type HeroesContextValue = {
  currentHero?: ICharacter;
  isHeroLoading: boolean;
  selection: HeroesContextSelection;

  selectHero: (hero: ICharacter) => void;
};

export const HeroesContext = createContext<HeroesContextValue>({
  currentHero: undefined,
  isHeroLoading: true,
  selection: {
    hero: undefined,
  },

  selectHero: () => {},
});

export const HeroesProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { data: currentHero, isFetching: isHeroLoading } = useGetCharacter();
  const [selection, setSelection] = useState<HeroesContextSelection>({
    hero: undefined,
  });

  const value = useMemo(() => {
    const { current, ...rest } = currentHero ?? {};
    const hero = currentHero
      ? ({ ...rest, characterId: current } as ICharacter)
      : undefined;

    return {
      currentHero: hero,
      isHeroLoading,
      selection: {
        ...selection,
        hero: selection.hero ?? hero,
      },
      selectHero: (hero: ICharacter) =>
        setSelection((prevSelection) => ({ ...prevSelection, hero })),
    };
  }, [currentHero, isHeroLoading, selection]);

  return (
    <HeroesContext.Provider value={value}>{children}</HeroesContext.Provider>
  );
};
