import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Card, CardType } from "@/components/common";
import { HSPieceImage } from "@/components/hs-shared";
import { Badge } from "@/components/pages/friends/components/invite-modal/components/badge/Badge";
import { CollectButtonColor } from "@/components/ui";
import { NS } from "@/constants/ns";
import {
  HeroClothPiece,
  HeroId,
  HeroRarity,
  IHeroClothConfig,
} from "@/services/heroes/types";
import { formatValue } from "@/utils/lib/utils";

type Props = {
  clothPiece: HeroClothPiece;
  clothPieceConfig: IHeroClothConfig;
  heroId: HeroId;
  heroRarity: HeroRarity;
  isOwnCloth: boolean;
  isCurrentCloth: boolean;
  isSelectedCloth: boolean;
  onCardClick: (clothPiece: HeroClothPiece, clothId: number) => void;
};

const clothPieceClassName = {
  [HeroClothPiece.CHAIN]: "scale-[3] -translate-x-[5%] translate-y-[5%]",
  [HeroClothPiece.HAT]: "scale-150 translate-y-[48%]",
  [HeroClothPiece.GLASS]: "scale-[2] translate-y-[36%]",
  [HeroClothPiece.KIT]: "scale-125 -translate-y-[20%]",
  [HeroClothPiece.WATCH]: "scale-[4] translate-x-[48%] -translate-y-[60%]",
};

export const ClothCard: FunctionComponent<Props> = ({
  clothPieceConfig,
  clothPiece,
  heroId,
  heroRarity,
  isOwnCloth,
  isCurrentCloth,
// isSelectedCloth,
  onCardClick,
}) => {
  const t = useTranslations(NS.PAGES.HEROES.ROOT);

  let type = CardType.ORANGE;

  if (isCurrentCloth) {
    type = CardType.DARK_BLUE;
  } else if (isOwnCloth) {
    type = CardType.GREEN;
  }

  const isSelectableCloth = isOwnCloth && !isCurrentCloth;

  return (
    <Card
      type={type}
      collectButtonProps={
        !isOwnCloth || isSelectableCloth
          ? {
              color: CollectButtonColor.GREEN,
              children: isSelectableCloth
                ? t(
                    `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.SELECT}`,
                  )
                : t(
                    `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.BUY}`,
                  ),
              onClick: () => onCardClick(clothPiece, clothPieceConfig.id),
            }
          : undefined
      }
      topBadge={
        isCurrentCloth && (
          <div className="text-stroke-1 px-3 py-1 text-xs font-extrabold text-white text-shadow-sm">
            {t(
              `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.SELECTED}`,
            )}
          </div>
        )
      }
      bottomBadge={
        !isOwnCloth ? (
          <Badge value={formatValue(clothPieceConfig.price)} />
        ) : undefined
      }
      onClick={() => onCardClick(clothPiece, clothPieceConfig.id)}
    >
      <HSPieceImage
        className={classNames(
          "h-full w-full will-change-transform",
          clothPieceClassName[clothPiece],
        )}
        heroId={heroId}
        heroRarity={heroRarity}
        part={clothPiece}
        clothId={clothPieceConfig.id}
        alt={`${clothPiece}-${clothPieceConfig.id}`}
        sizes="33vw"
        fill
      />
    </Card>
  );
};
