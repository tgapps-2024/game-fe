import React from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Card, CardType } from "@/components/common";
import { Badge } from "@/components/pages/friends/components/invite-modal/components/badge/Badge";
import { CollectButtonColor } from "@/components/ui";
import { NS } from "@/constants/ns";
import HarleyQuinnPortrait from "@/public/assets/png/heroes/portraits/harley_quinn.png";

export const HeroesGrid = () => {
  const t = useTranslations(NS.PAGES.HEROES.ROOT);

  return (
    <div className="relative flex min-h-[200px] flex-col">
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
      <div className="bg-black pb-0.5">
        <div className="flex w-full flex-col">
          <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
          <div className="relative h-0.5 w-full bg-[#E88C0E]" />
        </div>
        <div className="relative z-10 flex flex-col">
          <div className="h-0.5 w-full bg-[#35637D]" />
          <div className="flex w-full gap-x-2 bg-gradient-to-b from-[#04A0F5] to-[#0A4CDE] p-4">
            <div className="flex h-[38px] shrink-0 grow basis-0 rounded-lg border border-black bg-[#155081] pb-[3px] text-sm font-medium leading-none text-white">
              <div className="flex w-full rounded-lg bg-gradient-to-b from-[#29D6FF] to-[#2596E4] shadow-[0_-1px_0.5px_0_rgba(255,255,255,0.3)_inset] p-1">
                <div className="bg-white/20 shadow-link rounded w-full items-center justify-center flex">Обычный</div>
              </div>
            </div>
            <div className="flex h-9 shrink-0 grow basis-0 items-center justify-center rounded-lg bg-[#155081] text-sm font-medium leading-none text-white opacity-30">
              Редкий
            </div>
            <div className="flex h-9 shrink-0 grow basis-0 items-center justify-center rounded-lg bg-[#155081] text-sm font-medium leading-none text-white opacity-30">
              Эпический
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
          <div className="relative h-0.5 w-full bg-[#E88C0E]" />
        </div>
      </div>
      <div className="min-h-0 overflow-y-auto bg-[#192632]">
        {/* Orange bg #35241C */}
        <div className="grid grid-cols-3 grid-rows-3 gap-2 bg-[#192632] p-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <Card
              key={`heroes_card_${index}`}
              buttonColor={CollectButtonColor.GREEN}
              buttonText="Купить"
              isSelected={false}
              badgeComponent={<Badge value={1450} />}
              onClick={() => {}}
              type={CardType.BLUE}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <div className="absolute -bottom-4 h-full w-full">
                  <Image src={HarleyQuinnPortrait} alt="" fill />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};