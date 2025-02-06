import React, { FunctionComponent } from "react";

import Image from "next/image";

import classNames from "classnames";

import { CharacterId, HeroRarity } from "@/services/heroes/types";

type Props = {
  heroId: CharacterId;
  heroRarity: HeroRarity;
  className?: string;
};

export enum HeroPart {
  BODY = "Body",
  CHAIN = 'Chain',
  HEAD = "Head",
  HAT = "Hat",
  GLASS = "Glass",
  KIT = "Kit",
  WATCH = "Watch",
}

const srcBuilder = (
  heroId: CharacterId,
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

export const HeroView: FunctionComponent<Props> = ({ heroId, heroRarity, className }) => {
  return (
    <div className={classNames("absolute", className)}>
      <Image src={srcBuilder(heroId, heroRarity, HeroPart.BODY)} quality={100} alt="" fill />   {/* Body */}
      <Image src={srcBuilder(heroId, heroRarity, HeroPart.KIT, 0)} quality={100} alt="" fill /> {/* Kit */}
      <Image src={srcBuilder(heroId, heroRarity, HeroPart.HEAD)} quality={100} alt="" fill />   {/* Head */}
    </div>
  );
};
