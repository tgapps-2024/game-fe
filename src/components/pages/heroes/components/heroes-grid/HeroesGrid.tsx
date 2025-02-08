import React, { useContext, useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Card, CardType, PAGE_WRAPPER_ID } from "@/components/common";
import { Badge } from "@/components/pages/friends/components/invite-modal/components/badge/Badge";
import { CollectButtonColor } from "@/components/ui";
import { NS } from "@/constants/ns";
import { HeroesContext } from "@/context/heroes-context/HeroesContext";
import {
  useGetAllAppsHeroes,
  useGetAllHeroes,
  useSetHero,
} from "@/services/heroes/queries";
import { HeroId, HeroRarity } from "@/services/heroes/types";
import { groupAllAppsHeroesByRarity } from "@/utils/heroes";
import { formatValue } from "@/utils/lib/utils";

import { HeroView } from "../heroes-profile/components/hero-view/HeroView";

import { HeroesTabs } from "./components/HeroesTabs";

export const HeroesGrid = () => {
  const t = useTranslations(NS.PAGES.HEROES.ROOT);
  const [selectedTab, setSelectedTab] = useState<HeroRarity>(HeroRarity.COMMON);
  const { data: heroes } = useGetAllAppsHeroes();
  const { data: ownHeroes } = useGetAllHeroes();
  const { currentHero, selectHero } = useContext(HeroesContext);

  const { mutate: setProfileHero } = useSetHero();

  const heroesByRarity = useMemo(
    () => (heroes ? groupAllAppsHeroesByRarity(heroes) : null),
    [heroes],
  );

  const onSelectHero = (heroId: HeroId, isRemoteSelection?: boolean) => {
    const pageWrapper = document.getElementById(PAGE_WRAPPER_ID);

    if (pageWrapper) {
      pageWrapper.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (isRemoteSelection) {
      setProfileHero(heroId);
    } else {
      selectHero(heroId);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-x-0 -top-[50px] mx-auto w-fit rounded-t-2xl bg-[#FFCE08] px-1 pt-1">
        <div
          className={classNames(
            "w-fit rounded-b-md rounded-t-xl bg-orange-550 px-[30px] py-2 shadow-battle-pass-combined",
            "text-stroke-half text-2xl font-black uppercase tracking-wide text-white text-shadow",
          )}
        >
          {t(NS.PAGES.HEROES.TITLE)}
        </div>
      </div>
      <HeroesTabs selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      <div className="overflow-y-auto bg-[#192632]">
        <div
          className={classNames("grid grid-cols-3 grid-rows-3 gap-2 p-4", {
            "bg-[#192632]": selectedTab === HeroRarity.COMMON,
            "bg-[#35241C]": selectedTab === HeroRarity.RARE,
            "bg-[#2F1A60]": selectedTab === HeroRarity.EPIC,
          })}
        >
          {heroesByRarity && ownHeroes
            ? heroesByRarity[selectedTab].map((hero) => {
                let type = CardType.BLUE;
                const isOwnHero = ownHeroes.includes(hero.characterId);
                const isCurrentHero =
                  currentHero?.characterId === hero.characterId;
                const isSelectable = isOwnHero && !isCurrentHero;

                if (isCurrentHero) {
                  type = CardType.DARK_BLUE;
                } else if (selectedTab === HeroRarity.RARE) {
                  type = CardType.ORANGE;
                } else if (selectedTab === HeroRarity.EPIC) {
                  type = CardType.INDIGO;
                }

                return (
                  <Card
                    key={hero.characterId}
                    collectButtonProps={
                      !isCurrentHero
                        ? {
                            color: isSelectable
                              ? CollectButtonColor.YELLOW
                              : CollectButtonColor.GREEN,
                            children: isSelectable
                              ? t(
                                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.SELECT}`,
                                )
                              : t(
                                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.BUY}`,
                                ),
                            onClick: isSelectable
                              ? () => onSelectHero(hero.characterId, true)
                              : undefined,
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
                      !isOwnHero ? (
                        <Badge value={formatValue(hero.price)} />
                      ) : undefined
                    }
                    onClick={() => onSelectHero(hero.characterId)}
                    type={type}
                  >
                    <HeroView
                      className="absolute h-full w-full"
                      heroId={hero.characterId}
                    />
                  </Card>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
