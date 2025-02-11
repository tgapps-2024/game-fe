import React, { FunctionComponent } from "react";

import { CLOTH_PIECE_CONTAINER_ID } from "@/components/pages/shop/constants";
import {
  HeroClothPiece,
  HeroClothPieceConfig,
  HeroId,
  HeroRarity,
} from "@/services/heroes/types";

import { ClothCarousel } from "./components/cloth-carousel/ClothCarousel";

type Props = {
  title: string;
  clothPiece: HeroClothPiece;
  clothPieceConfig: HeroClothPieceConfig;
  heroId: HeroId;
  heroRarity: HeroRarity;
};

export const ClothListRow: FunctionComponent<Props> = ({
  title,
  clothPiece,
  clothPieceConfig,
  heroId,
  heroRarity,
}) => (
  <div
    id={CLOTH_PIECE_CONTAINER_ID[clothPiece]}
    className="flex flex-col gap-y-0.5"
  >
    <div className="flex items-center justify-between text-white">
      <div className="text-2xl font-black text-shadow">{title}</div>
      <div className="rounded-[20px] bg-[#713110] px-3 py-1 text-sm font-extrabold text-white text-shadow">
        {Object.keys(clothPieceConfig).length}
      </div>
    </div>
    <ClothCarousel
      clothPiece={clothPiece}
      clothPieceConfig={clothPieceConfig}
      heroId={heroId}
      heroRarity={heroRarity}
    />
  </div>
);
