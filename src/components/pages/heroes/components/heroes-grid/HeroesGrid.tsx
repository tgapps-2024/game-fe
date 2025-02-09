import React, { useContext, useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { PAGE_WRAPPER_ID } from "@/components/common";
import { NS } from "@/constants/ns";
import { HeroesContext } from "@/context/heroes-context/HeroesContext";
import {
  useGetAllAppsHeroes,
  useGetAllHeroes,
} from "@/services/heroes/queries";
import { HeroId, HeroRarity } from "@/services/heroes/types";
import { groupAllAppsHeroesByRarity } from "@/utils/heroes";

import { HeroesGridCard } from "./components/heroes-grid-card/HeroesGridCard";
import { HeroesTabs } from "./components/heroes-tabs/HeroesTabs";

export const HeroesGrid = () => {
  const t = useTranslations(NS.PAGES.HEROES.ROOT);
  const [selectedTab, setSelectedTab] = useState<HeroRarity>(HeroRarity.COMMON);
  const { data: heroes } = useGetAllAppsHeroes();
  const { data: ownHeroes, isPending: isOwnHeroesPending } = useGetAllHeroes();
  const { currentHero, selectHero } = useContext(HeroesContext);

  const heroesByRarity = useMemo(
    () => (heroes ? groupAllAppsHeroesByRarity(heroes) : null),
    [heroes],
  );

  const onSelectHero = (heroId: HeroId) => {
    const pageWrapper = document.getElementById(PAGE_WRAPPER_ID);

    if (pageWrapper) {
      pageWrapper.scrollTo({ top: 0, behavior: "smooth" });
    }

    selectHero(heroId);
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
          {heroesByRarity && !isOwnHeroesPending
            ? heroesByRarity[selectedTab].map((hero) => {
                const isOwnHero = ownHeroes?.includes(hero.characterId);
                const isCurrentHero =
                  currentHero?.characterId === hero.characterId;
                const isSelectableHero = isOwnHero && !isCurrentHero;

                return (
                  <HeroesGridCard
                    key={hero.characterId}
                    heroId={hero.characterId}
                    heroRarity={hero.rarity}
                    heroPrice={hero.price}
                    isOwnHero={isOwnHero}
                    isCurrentHero={isCurrentHero}
                    isSelectableHero={isSelectableHero}
                    onSelectHero={onSelectHero}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
