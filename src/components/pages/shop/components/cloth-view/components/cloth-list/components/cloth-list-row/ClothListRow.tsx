import React, { FunctionComponent, useContext } from "react";

import { PAGE_WRAPPER_ID } from "@/components/common";
import { CLOTH_PIECE_CONTAINER_ID } from "@/components/pages/shop/constants";
import { HSSharedContext } from "@/context/hs-shared-context/HSSharedContext";
import {
  HeroClothPiece,
  HeroClothPieceConfig,
  HeroId,
  HeroRarity,
} from "@/services/heroes/types";

import { ClothCarousel } from "./components/cloth-carousel/ClothCarousel";
import { ThreeClothSet } from "./components/three-cloth-set/ThreeClothSet";

type Props = {
  title: string;
  clothPiece: HeroClothPiece;
  clothPieceConfig: HeroClothPieceConfig;
  heroId: HeroId;
  heroRarity: HeroRarity;
  ownCloth: number[];
};

export const ClothListRow: FunctionComponent<Props> = ({
  title,
  clothPiece,
  clothPieceConfig,
  heroId,
  heroRarity,
  ownCloth,
}) => {
  const clothPieceConfigs = Object.values(clothPieceConfig);
  const { selectCloth } = useContext(HSSharedContext);

  const onSelectCloth = (clothPiece: HeroClothPiece, clothId: number) => {
    const pageWrapper = document.getElementById(PAGE_WRAPPER_ID);

    if (pageWrapper) {
      pageWrapper.scrollTo({ top: 0, behavior: "smooth" });
    }

    selectCloth(clothPiece, clothId);
  };

  return (
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
      {clothPieceConfigs.length > 3 ? (
        <ClothCarousel
          clothPiece={clothPiece}
          clothPieceConfigs={clothPieceConfigs}
          heroId={heroId}
          heroRarity={heroRarity}
          ownCloth={ownCloth}
          onCardClick={onSelectCloth}
        />
      ) : (
        <ThreeClothSet
          clothPiece={clothPiece}
          clothPieceConfigs={clothPieceConfigs}
          heroId={heroId}
          heroRarity={heroRarity}
          ownCloth={ownCloth}
          onCardClick={onSelectCloth}
        />
      )}
    </div>
  );
};
