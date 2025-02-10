import React, { FunctionComponent } from "react";

import classNames from "classnames";

import { HeroClothPiece, HeroId, HeroRarity } from "@/services/heroes/types";

import { HeroPartImage } from "./components/hero-part-image/HeroPartImage";

type Props = {
  heroId: HeroId;
  heroRarity: HeroRarity;
  source: "grid" | "preview";
  className?: string;
};

export enum HeroBodyPart {
  BODY = "body",
  HEAD = "head",
}

/*
  Rendering order should be as follows:
    1. HeroBodyPart.BODY
    2. HeroClothPiece.KIT
    3. HeroClothPiece.CHAIN
    4. HeroBodyPart.HEAD
    5. HeroClothPiece.HAT
    6. HeroClothPiece.GLASS
    7. HeroClothPiece.WATCH
*/

const HERO_PARTS = [HeroBodyPart.BODY, HeroClothPiece.KIT, HeroBodyPart.HEAD];

const DUROV_HERO_PARTS = [
  HeroBodyPart.BODY,
  HeroClothPiece.KIT,
  HeroBodyPart.HEAD,
  HeroClothPiece.HAT,
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
  const endsWith =
    typeof value === "number" ? `/${value}.webp` : `/${capitalizedPart}.webp`;

  return `${startsWith}${capitalizedPart}${endsWith}`;
};

export const HeroView: FunctionComponent<Props> = ({
  heroId,
  heroRarity,
  source,
  className,
}) => {
  const sizes = source === "grid" ? "33vw" : "50vw";
  const heroParts = heroId === HeroId.DUROV ? DUROV_HERO_PARTS : HERO_PARTS;

  return (
    <div className={classNames("absolute", className)}>
      {heroParts.map((part) => {
        if (part === HeroBodyPart.BODY || part === HeroBodyPart.HEAD) {
          return (
            <HeroPartImage
              key={part}
              src={srcBuilder(heroId, heroRarity, part)}
              quality={100}
              alt={part}
              sizes={sizes}
              fill
            />
          );
        }

        return (
          <HeroPartImage
            key={part}
            src={srcBuilder(heroId, heroRarity, part, 0)}
            quality={100}
            alt={part}
            sizes={sizes}
            fill
          />
        );
      })}
    </div>
  );
};
