export enum CharacterId {
  BEARD = "Beard",
  BAFFET = "Baffet",
  BLONDE = "Blonde",
  BOY = "Boy",
  BROWNHAIRED = "BrownHaired",
  BUTEREN = "Buteren",
  CAPTAINAMERICA = "CaptainAmerica",
  DEADPOOL = "Deadpool",
  DEFAULT = "Default",
  DEFAULTHQ = "DefaultHQ",
  DUROV = "Durov",
  GIRL = "Girl",
  GRETTATUMBERG = "GrettaTumberg",
  HASBIK = "Hasbik",
  IRONMAN = "Ironman",
  JONES = "Jones",
  MESSI = "Messi",
  MUSK = "Musk",
  OBGUY = "ObGuy",
  QUEEN = "Queen",
  REDHEAD = "RedHead",
  ROSSOMAHA = "Rossomaha",
  SPIDERMAN = "Spiderman",
  STRANGE = "Strange",
  TRUMP = "Trump",
  ZUCKERBERG = "Zuckerberg",
}

export enum HeroRarity {
  COMMON = "common",
  RARE = "rare",
  EPIC = "epic",
}

export enum HeroCurrency {
  STARS = "stars",
  COINS = "coins",
}

export interface ICharacterIdentity {
  characterId: CharacterId;
}

export interface ICharacterStats {
  earn_per_hour: number;
  earn_per_tap: number;
  energy: number;
}

export interface ICharacterEquipment {
  auto: number; // todo: future feature
  background: number; // todo: future feature
  chain: number;
  glass: number;
  hat: number;
  kit: number;
  watch: number;
}

export interface ICharacter
  extends ICharacterIdentity,
    ICharacterEquipment,
    ICharacterStats {}

export interface ICharacterInfo extends ICharacterEquipment, ICharacterStats {
  current: CharacterId;
}

export type GetAllCharactersResponse = {
  characters: ICharacterIdentity[];
};

export interface ICharacterConfig extends ICharacterStats {
  cloth: Record<string, string>; // todo: Improve "cloth" type
  currency: HeroCurrency;
  level_for_open: number;
  price: number;
  rarity: HeroRarity;
}

export interface ICharacterConfigWithId extends ICharacterConfig {
  characterId: CharacterId;
}

export type GetAllAppsCharactersResponse = Record<
  CharacterId,
  ICharacterConfig
>;
export type AllAppsCharactersByRarity = Record<
  HeroRarity,
  Array<ICharacterConfigWithId>
>;
