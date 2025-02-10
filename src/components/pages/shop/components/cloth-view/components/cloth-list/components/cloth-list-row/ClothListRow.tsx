import React, { FunctionComponent } from "react";

import { HeroClothPieceConfig } from "@/services/heroes/types";

import { ClothCarousel } from "./components/cloth-carousel/ClothCarousel";

type Props = {
  title: string;
  clothPieceConfig: HeroClothPieceConfig;
};

export const ClothListRow: FunctionComponent<Props> = ({
  title,
  clothPieceConfig,
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center justify-between text-white">
        <div className="text-stroke-1 text-2xl font-black text-shadow">
          {title}
        </div>
        <div className="text-stroke-1 rounded-[20px] bg-[#713110] px-3 py-1 text-sm font-extrabold text-white text-shadow">
          {Object.keys(clothPieceConfig).length}
        </div>
      </div>
      <ClothCarousel clothPieceConfig={clothPieceConfig} />
    </div>
  );
};
