import React, {
  ComponentProps,
  FunctionComponent,
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  HeroBodyPart,
  HeroClothPiece,
  HeroId,
  HeroRarity,
} from "@/services/heroes/types";

const capitalizeFirstLetter = (str: string) => {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
};

const srcBuilder = (
  heroId: HeroId,
  heroRarity: HeroRarity,
  part: HeroBodyPart | HeroClothPiece,
  clothId?: number,
): string => {
  const startsWith = `/assets/png/heroes/${heroRarity}/${heroId}/`;
  const capitalizedPart = capitalizeFirstLetter(part);
  const endsWith =
    typeof clothId === "number"
      ? `/${clothId}.webp`
      : `/${capitalizedPart}.webp`;

  return `${startsWith}${capitalizedPart}${endsWith}`;
};

type Props = Omit<ComponentProps<typeof Image>, "src"> & {
  heroId: HeroId;
  heroRarity: HeroRarity;
  part: HeroBodyPart | HeroClothPiece;
  clothId?: number;
};

export const HSPieceImage: FunctionComponent<Props> = ({
  heroId,
  heroRarity,
  part,
  clothId,
  ...props
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const src =
    part === HeroBodyPart.BODY || part === HeroBodyPart.HEAD
      ? srcBuilder(heroId, heroRarity, part)
      : srcBuilder(heroId, heroRarity, part, clothId ?? 0);

  useEffect(() => {
    setIsHidden(false);
  }, [src]);

  return (
    !isHidden && (
      <Image
        {...props}
        alt={props.alt} // to appease eslint
        src={src}
        onError={() => {
          if (!isHidden) {
            setIsHidden(true);
          }
        }}
      />
    )
  );
};
