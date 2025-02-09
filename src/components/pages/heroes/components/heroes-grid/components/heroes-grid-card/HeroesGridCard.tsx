import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import { Card, CardType } from "@/components/common";
import { Badge } from "@/components/pages/friends/components/invite-modal/components/badge/Badge";
import { CollectButtonColor } from "@/components/ui";
import { NS } from "@/constants/ns";
import { HeroId, HeroRarity } from "@/services/heroes/types";
import { formatValue } from "@/utils/lib/utils";

import { HeroView } from "../../../heroes-profile/components/hero-view/HeroView";

type Props = {
  heroId: HeroId;
  heroRarity: HeroRarity;
  heroPrice: number;
  isOwnHero?: boolean;
  isCurrentHero?: boolean;
  isSelectableHero?: boolean;
  onSelectHero: (heroId: HeroId) => void;
};

export const HeroesGridCard: FunctionComponent<Props> = ({
  heroId,
  heroRarity,
  heroPrice,
  isOwnHero,
  isCurrentHero,
  isSelectableHero,
  onSelectHero,
}) => {
  const t = useTranslations(NS.PAGES.HEROES.ROOT);

  let type = CardType.BLUE;

  if (isCurrentHero) {
    type = CardType.DARK_BLUE;
  } else if (heroRarity === HeroRarity.RARE) {
    type = CardType.ORANGE;
  } else if (heroRarity === HeroRarity.EPIC) {
    type = CardType.INDIGO;
  }

  return (
    <Card
      key={heroId}
      collectButtonProps={
        !isCurrentHero
          ? {
              color: isSelectableHero
                ? CollectButtonColor.YELLOW
                : CollectButtonColor.GREEN,
              children: isSelectableHero
                ? t(
                    `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.SELECT}`,
                  )
                : t(
                    `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.BUY}`,
                  ),
              onClick: () => onSelectHero(heroId),
            }
          : undefined
      }
      topBadge={
        isCurrentHero ? (
          <div className="text-stroke-1 px-3 py-1 text-xs font-extrabold text-white text-shadow-sm">
            {t(
              `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.SELECTED}`,
            )}
          </div>
        ) : undefined
      }
      bottomBadge={
        !isOwnHero ? <Badge value={formatValue(heroPrice)} /> : undefined
      }
      onClick={() => onSelectHero(heroId)}
      type={type}
    >
      <HeroView
        className="absolute h-full w-full"
        heroId={heroId}
        heroRarity={heroRarity}
        source="grid"
      />
    </Card>
  );
};
