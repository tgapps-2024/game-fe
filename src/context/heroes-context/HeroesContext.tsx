import { createContext } from "react";

import { ICharacter } from "@/services/heroes/types";

type HeroesContextValue = {
  selectedHero?: ICharacter;
};

export const HeroesContext = createContext<HeroesContextValue>({
  selectedHero: undefined,
});
