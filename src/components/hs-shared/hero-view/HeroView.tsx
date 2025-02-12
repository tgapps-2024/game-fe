import React, { FunctionComponent } from "react";

import classNames from "classnames";

import {
  HeroBodyPart,
  HeroClothPiece,
  HeroId,
  HeroRarity,
} from "@/services/heroes/types";

import { HSPieceImage } from "../hs-piece-image/HSPieceImage";

type Props = {
  heroId: HeroId;
  heroRarity: HeroRarity;
  source: "grid" | "preview";
  className?: string;
};

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
      {heroParts.map((part) => (
        <HSPieceImage
          key={part}
          heroId={heroId}
          heroRarity={heroRarity}
          part={part}
          quality={100}
          alt={part}
          sizes={sizes}
          fill
        />
      ))}
    </div>
  );
};
