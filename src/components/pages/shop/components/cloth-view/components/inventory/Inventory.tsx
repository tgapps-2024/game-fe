import React, { useContext } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import { HSSharedContext } from "@/context/hs-shared-context/HSSharedContext";
import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import { HeroClothPiece } from "@/services/heroes/types";

import { InventoryCell } from "./components/inventory-cell/InventoryCell";

export const Inventory = () => {
  const t = useTranslations(NS.PAGES.SHOP.ROOT);
  const { selection } = useContext(HSSharedContext);
  const { data: heroes } = useGetAllAppsHeroes();

  const heroId = selection.hero?.characterId;
  const cloth = heroId ? heroes?.[heroId]?.cloth : undefined;

  return (
    <div className="bg-black pb-0.5">
      <div className="flex w-full flex-col">
        <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
        <div className="relative h-0.5 w-full bg-[#E88C0E]" />
      </div>
      <div className="flex flex-col">
        <div className="h-0.5 w-full bg-[#7F6F30]" />
        <div
          className={classNames(
            "flex justify-center gap-x-2 bg-shop-inventory-bg-pattern px-2 pb-2 pt-1.5",
            { "h-25": !cloth },
          )}
        >
          {cloth &&
            Object.keys(cloth).map((clothPiece) => {
              const clothPieceConfig = cloth[clothPiece as HeroClothPiece];

              return clothPieceConfig ? (
                <InventoryCell
                  key={clothPiece}
                  clothPiece={clothPiece as HeroClothPiece}
                  label={t(
                    `${NS.PAGES.SHOP[clothPiece.toUpperCase() as Uppercase<HeroClothPiece>]}`,
                    { form: "single" },
                  )}
                />
              ) : null;
            })}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
        <div className="relative h-0.5 w-full bg-[#E88C0E]" />
      </div>
    </div>
  );
};
