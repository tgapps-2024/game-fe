import React, { FunctionComponent } from "react";

import Image from "next/image";

import { CLOTH_PIECE_CONTAINER_ID } from "@/components/pages/shop/constants";
import InventoryPlus from "@/public/assets/png/shop/inventory-plus.webp";
import { HeroClothPiece } from "@/services/heroes/types";

type Props = {
  label: string | null;
  clothPiece: HeroClothPiece;
  clothId?: number;
};

export const InventoryCell: FunctionComponent<Props> = ({
  label,
  clothPiece,
  clothId,
}) => {
  const onClick = () => {
    if (!clothId) {
      const target = document.getElementById(
        CLOTH_PIECE_CONTAINER_ID[clothPiece],
      );

      if (target) {
        target.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex basis-1/5 flex-col gap-y-1" onClick={onClick}>
      <div className="aspect-square overflow-hidden rounded-lg border border-[#552005] bg-[#883308] pb-px">
        <div className="h-full rounded-b-lg bg-shop-inventory-bg-pattern p-1 shadow-[inset_0_-1px_0.5px_rgba(255,255,255,0.3)]">
          <div className="relative h-full rounded-md bg-[#883308] shadow-card-inner-shadow">
            <Image
              className="absolute inset-0 m-auto w-[36%]"
              src={InventoryPlus}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="text-stroke-1 text-center text-xs font-bold tracking-wide text-white text-shadow-sm">
        {label}
      </div>
    </div>
  );
};
