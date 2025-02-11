import React from "react";

import { useTranslations } from "next-intl";

import { NS } from "@/constants/ns";
import { HeroClothPiece } from "@/services/heroes/types";

import { InventoryCell } from "./components/inventory-cell/InventoryCell";

const HERO_CLOTHS = [
  HeroClothPiece.KIT,
  HeroClothPiece.GLASS,
  HeroClothPiece.HAT,
  HeroClothPiece.WATCH,
  HeroClothPiece.CHAIN,
];

export const Inventory = () => {
  const t = useTranslations(NS.PAGES.SHOP.ROOT);

  return (
    <div className="bg-black pb-0.5">
      <div className="flex w-full flex-col">
        <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
        <div className="relative h-0.5 w-full bg-[#E88C0E]" />
      </div>
      <div className="flex flex-col">
        <div className="h-0.5 w-full bg-[#7F6F30]" />
        <div className="bg-shop-inventory-bg-pattern flex gap-x-2 px-2 pb-2 pt-1.5">
          {HERO_CLOTHS.map((cloth) => (
            <InventoryCell
              key={cloth}
              label={t(
                `${NS.PAGES.SHOP[cloth.toUpperCase() as Uppercase<HeroClothPiece>]}`,
                { form: "single" },
              )}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
        <div className="relative h-0.5 w-full bg-[#E88C0E]" />
      </div>
    </div>
  );
};
