import React, { FunctionComponent } from "react";

import classNames from "classnames";

import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import { HeroClothPiece, HeroId, HeroRarity } from "@/services/heroes/types";

import { HeroPartImage } from "./components/hero-part-image/HeroPartImage";

type Props = {
  heroId: HeroId;
  className?: string;
};

export enum HeroBodyPart {
  BODY = "body",
  HEAD = "head",
}

const HERO_PARTS = [
  HeroBodyPart.BODY,
  HeroClothPiece.KIT,
  HeroClothPiece.CHAIN,
  HeroBodyPart.HEAD,
  HeroClothPiece.HAT,
  HeroClothPiece.GLASS,
  HeroClothPiece.WATCH,
];

const capitalizeFirstLetter = (str: string) => {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
};

const srcBuilder = (
  heroId: HeroId,
  heroRarity: HeroRarity,
  part: HeroBodyPart | HeroClothPiece,
  value?: number,
): string => {
  const startsWith = `/assets/png/heroes/${heroRarity}/${heroId}/`;
  const capitalizedPart = capitalizeFirstLetter(part);
  const endsWith = `/${capitalizedPart}.png`;

  return typeof value === "number"
    ? `${startsWith}${capitalizedPart}/${value}${endsWith}`
    : `${startsWith}${capitalizedPart}${endsWith}`;
};

export const HeroView: FunctionComponent<Props> = ({ heroId, className }) => {
  const { data: allHeroes } = useGetAllAppsHeroes();

  if (!allHeroes) return null;

  const hero = allHeroes[heroId];

  return (
    <div className={classNames("absolute", className)}>
      {HERO_PARTS.map((part) => {
        if (part === HeroBodyPart.BODY || part === HeroBodyPart.HEAD) {
          return (
            <HeroPartImage
              key={part}
              src={srcBuilder(heroId, hero.rarity, part)}
              quality={100}
              alt={part}
              sizes="33vw"
              fill
            />
          );
        }

        const clothConfig = hero.cloth[part];

        return clothConfig ? (
          <HeroPartImage
            key={part}
            src={srcBuilder(
              heroId,
              hero.rarity,
              part,
              part === HeroClothPiece.KIT ? 0 : 1,
            )}
            quality={100}
            alt={part}
            sizes="33vw"
            fill
          />
        ) : null;
      })}
    </div>
  );
};
