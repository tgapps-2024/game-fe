export enum CharacterId {
  BAFFET = "Baffet",
  BEAST = "Beast",
  DUROV = "Durov",
  JONES = "Jones",
  ZUCKERBERG = "Zuckerberg",
}

export interface ICharacter {
  auto: number;
  background: number;
  chain: number;
  current: CharacterId;
  earn_per_hour: number;
  earn_per_tap: number;
  energy: number;
  glass: number;
  hat: number;
  kit: number;
  watch: number;
}

export type GetAllCharactersResponse = {
  characters: ICharacter[];
};
