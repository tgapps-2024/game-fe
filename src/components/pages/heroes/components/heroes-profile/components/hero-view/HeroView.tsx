import React, { FunctionComponent } from "react";

import classNames from "classnames";

import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import { HeroId, HeroRarity } from "@/services/heroes/types";

import { HeroPartImage } from "./components/hero-part-image/HeroPartImage";

type Props = {
  heroId: HeroId;
  className?: string;
};

export enum HeroPart {
  BODY = "Body",
  CHAIN = "Chain",
  HEAD = "Head",
  HAT = "Hat",
  GLASS = "Glass",
  KIT = "Kit",
  WATCH = "Watch",
}

// const renderOrder = [
//   HeroPart.BODY,
//   HeroPart.KIT,
//   HeroPart.HEAD,
//   HeroPart.HAT,
//   HeroPart.GLASS,
//   HeroPart.WATCH,
//   HeroPart.CHAIN,
// ];

const srcBuilder = (
  heroId: HeroId,
  heroRarity: HeroRarity,
  part: HeroPart,
  value?: number,
): string => {
  const startsWith = `/assets/png/heroes/${heroRarity}/${heroId}/`;
  const endsWith = `/${part}.png`;

  return typeof value === "number"
    ? `${startsWith}${part}/${value}${endsWith}`
    : `${startsWith}${part}${endsWith}`;
};

export const HeroView: FunctionComponent<Props> = ({ heroId, className }) => {
  const { data: allHeroes } = useGetAllAppsHeroes();

  if (!allHeroes) return null;

  const hero = allHeroes[heroId];

  return (
    <div className={classNames("absolute", className)}>
      <HeroPartImage
        src={srcBuilder(heroId, hero.rarity, HeroPart.BODY)}
        quality={100}
        alt=""
        fill
      />
      <HeroPartImage
        src={srcBuilder(heroId, hero.rarity, HeroPart.KIT, 0)}
        quality={100}
        alt=""
        fill
      />
      <HeroPartImage
        src={srcBuilder(heroId, hero.rarity, HeroPart.HEAD)}
        quality={100}
        alt=""
        fill
      />
      <HeroPartImage
        src={srcBuilder(heroId, hero.rarity, HeroPart.HAT, 1)}
        quality={100}
        alt=""
        fill
      />
      <HeroPartImage
        src={srcBuilder(heroId, hero.rarity, HeroPart.GLASS, 1)}
        quality={100}
        alt=""
        fill
      />
      <HeroPartImage
        src={srcBuilder(heroId, hero.rarity, HeroPart.WATCH, 1)}
        quality={100}
        alt=""
        fill
      />
      <HeroPartImage
        src={srcBuilder(heroId, hero.rarity, HeroPart.CHAIN, 1)}
        quality={100}
        alt=""
        fill
      />
    </div>
  );
};
