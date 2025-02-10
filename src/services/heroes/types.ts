export enum HeroId {
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

export enum HeroClothPiece {
  CHAIN = "chain",
  HAT = "hat",
  GLASS = "glass",
  KIT = "kit",
  WATCH = "watch",
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

export interface IHeroIdentity {
  characterId: HeroId;
}

export interface IHeroStats {
  earn_per_hour: number;
  earn_per_tap: number;
  energy: number;
}

export interface IHeroEquipment {
  auto: number; // todo: future feature
  background: number; // todo: future feature
  chain: number;
  glass: number;
  hat: number;
  kit: number;
  watch: number;
}

export interface ISelectedHero
  extends IHeroIdentity,
    IHeroEquipment,
    IHeroStats {
  rarity: HeroRarity;
  price: number;
  currency: HeroCurrency;
}

export interface IHeroInfo extends IHeroEquipment, IHeroStats {
  current: HeroId;
}

export interface IHeroClothConfig extends IHeroStats {
  id: number;
  level_for_open: number;
  price: number;
  currency: HeroCurrency;
}

export type HeroClothPieceConfig = Record<string, IHeroClothConfig>;

export interface IHeroConfig extends IHeroStats {
  cloth: Record<HeroClothPiece, HeroClothPieceConfig | null>;
  level_for_open: number;
  price: number;
  rarity: HeroRarity;
}

export interface IHeroConfigWithId extends IHeroConfig {
  characterId: HeroId;
}

export type GetAllHeroesResponse = {
  characters: HeroId[];
};

export type GetAllAppsHeroesResponse = Record<HeroId, IHeroConfig>;

export type AllAppsHeroesByRarity = Record<
  HeroRarity,
  Array<IHeroConfigWithId>
>;
