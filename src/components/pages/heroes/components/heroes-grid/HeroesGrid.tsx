import React, { useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Card, CardType } from "@/components/common";
import { Badge } from "@/components/pages/friends/components/invite-modal/components/badge/Badge";
import { CollectButtonColor } from "@/components/ui";
import { NS } from "@/constants/ns";
import HarleyQuinnPortrait from "@/public/assets/png/heroes/portrait/harley_quinn.png";

import { HeroType } from "../../types";

import { HeroesTabs } from "./components/HeroesTabs";

export const HeroesGrid = () => {
  const t = useTranslations(NS.PAGES.HEROES.ROOT);
  const [selectedTab, setSelectedTab] = useState<HeroType>(HeroType.REGULAR);

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
            "bg-[#192632]": selectedTab === HeroType.REGULAR,
            "bg-[#35241C]": selectedTab === HeroType.RARE,
            "bg-[#2F1A60]": selectedTab === HeroType.EPIC,
          })}
        >
          {Array.from({ length: 9 }).map((_, index) => {
            let type = CardType.BLUE;

            if (selectedTab === HeroType.RARE) {
              type = CardType.ORANGE;
            } else if (selectedTab === HeroType.EPIC) {
              type = CardType.INDIGO;
            }

            return (
              <Card
                key={`heroes_card_${index}`}
                buttonColor={CollectButtonColor.GREEN}
                buttonText="Купить"
                isSelected={false}
                badgeComponent={<Badge value={1450} />}
                onClick={() => {}}
                type={type}
              >
                <div className="absolute h-full w-full">
                  <Image src={HarleyQuinnPortrait} alt="" fill quality={100} />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
