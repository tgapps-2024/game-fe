import React, { useContext, useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Card, CardType, PAGE_WRAPPER_ID } from "@/components/common";
import { Badge } from "@/components/pages/friends/components/invite-modal/components/badge/Badge";
import { CollectButtonColor } from "@/components/ui";
import { NS } from "@/constants/ns";
import { HeroesContext } from "@/context/heroes-context/HeroesContext";
import { useGetAllAppsCharacters } from "@/services/heroes/queries";
import { HeroRarity, ICharacterConfigWithId } from "@/services/heroes/types";
import { groupAllAppsCharactersByRarity } from "@/utils/heroes";

import { HeroView } from "../heroes-profile/components/hero-view/HeroView";

import { HeroesTabs } from "./components/HeroesTabs";

export const HeroesGrid = () => {
  const t = useTranslations(NS.PAGES.HEROES.ROOT);
  const [selectedTab, setSelectedTab] = useState<HeroRarity>(HeroRarity.COMMON);
  const { data: heroes } = useGetAllAppsCharacters();
  const { selectHero } = useContext(HeroesContext);

  const heroesByRarity = useMemo(
    () => (heroes ? groupAllAppsCharactersByRarity(heroes) : null),
    [heroes],
  );

  const onSelectHero = (hero: ICharacterConfigWithId) => {
    const pageWrapper = document.getElementById(PAGE_WRAPPER_ID);

    if (pageWrapper) {
      pageWrapper.scrollTo({ top: 0, behavior: "smooth" });
    }

    const { characterId, earn_per_hour, earn_per_tap, energy } = hero;

    selectHero({
      auto: 0,
      background: 0,
      chain: 0,
      kit: 0,
      glass: 0,
      hat: 0,
      watch: 0,
      characterId,
      earn_per_hour,
      earn_per_tap,
      energy,
    });
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
          {heroesByRarity
            ? heroesByRarity[selectedTab].map((hero) => {
                let type = CardType.BLUE;

                if (selectedTab === HeroRarity.RARE) {
                  type = CardType.ORANGE;
                } else if (selectedTab === HeroRarity.EPIC) {
                  type = CardType.INDIGO;
                }

                return (
                  <Card
                    key={hero.characterId}
                    buttonColor={CollectButtonColor.GREEN}
                    buttonText="Купить"
                    isSelected={false}
                    badgeComponent={<Badge value={hero.price} />}
                    onClick={() => onSelectHero(hero)}
                    type={type}
                  >
                    <HeroView
                      className="absolute h-full w-full"
                      heroId={hero.characterId}
                      heroRarity={HeroRarity.COMMON}
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
