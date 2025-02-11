import React, { useContext } from "react";

import { useTranslations } from "next-intl";

import { NS } from "@/constants/ns";
import { HSSharedContext } from "@/context/hs-shared-context/HSSharedContext";
import { useGetAllAppsHeroes } from "@/services/heroes/queries";
import { HeroClothPiece } from "@/services/heroes/types";

import { ClothListRow } from "./components/cloth-list-row/ClothListRow";

export const ClothList = () => {
  const t = useTranslations(NS.PAGES.SHOP.ROOT);
  const { selection } = useContext(HSSharedContext);
  const { data: heroes } = useGetAllAppsHeroes();

  if (!selection.hero || !heroes) return null;
  const { characterId: heroId } = selection.hero;
  const hero = heroes[heroId];

  return (
    <div className="flex flex-col gap-y-6 bg-[#35241C] px-4 pb-6 pt-4">
      {Object.keys(hero.cloth).map((clothPiece) => {
        const clothPieceConfig = hero.cloth[clothPiece as HeroClothPiece];

        return (
          clothPieceConfig && (
            <ClothListRow
              key={clothPiece}
              title={t(
                `${NS.PAGES.SHOP[clothPiece.toUpperCase() as Uppercase<HeroClothPiece>]}`,
                { form: "plural" },
              )}
              clothPiece={clothPiece as HeroClothPiece}
              clothPieceConfig={clothPieceConfig}
              heroId={heroId}
              heroRarity={hero.rarity}
            />
          )
        );
      })}
    </div>
  );
};
