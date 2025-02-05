import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";

import { HeroType } from "../../../types";

type Props = {
  selectedTab: HeroType;
  onSelectTab: (tab: HeroType) => void;
};

export const HeroesTabs: FunctionComponent<Props> = ({
  selectedTab,
  onSelectTab,
}) => {
  const t = useTranslations(NS.PAGES.HEROES.ROOT);

  return (
    <div className="bg-black pb-0.5">
      <div className="flex w-full flex-col">
        <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
        <div className="relative h-0.5 w-full bg-[#E88C0E]" />
      </div>
      <div className="relative z-10 flex flex-col">
        <div className="h-0.5 w-full bg-[#35637D]" />
        <div className="flex w-full gap-x-2 bg-gradient-to-b from-[#04A0F5] to-[#0A4CDE] p-4">
          {Object.keys(HeroType).map((key) => {
            const tab = HeroType[key as keyof typeof HeroType];
            const label = t(
              `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.HERO_TYPE.ROOT}.${NS.PAGES.HEROES.LABELS.HERO_TYPE[tab]}`,
            );
            const elementKey = `heroes-tab-${tab}`;

            return tab === selectedTab ? (
              <div
                key={elementKey}
                className={classNames(
                  "flex h-[38px] grow basis-1/3 rounded-lg border border-black pb-[3px] text-sm font-medium leading-none",
                  {
                    "text-white": tab !== HeroType.RARE,
                    "text-[#742C07]": tab === HeroType.RARE,
                    "bg-[#155081]": tab === HeroType.REGULAR,
                    "bg-[#883308]": tab === HeroType.RARE,
                    "bg-[#403BB7]": tab === HeroType.EPIC,
                  },
                )}
              >
                <div
                  className={classNames(
                    "flex w-full rounded-lg bg-gradient-to-b p-1 shadow-[0_-1px_0.5px_0_rgba(255,255,255,0.3)_inset]",
                    {
                      "from-[#29D6FF] to-[#2596E4]": tab === HeroType.REGULAR,
                      "from-[#FFDE60] to-[#FABF33]": tab === HeroType.RARE,
                      "from-[#9099FD] to-[#777AF0]": tab === HeroType.EPIC,
                    },
                  )}
                >
                  <div
                    className={classNames(
                      "flex w-full items-center justify-center rounded shadow-link",
                      {
                        "bg-white/20": tab === HeroType.REGULAR,
                        "bg-white/30": tab === HeroType.RARE,
                        "bg-white/15": tab === HeroType.EPIC,
                      },
                    )}
                  >
                    {label}
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={elementKey}
                className="flex h-9 grow basis-1/3 items-center justify-center rounded-lg bg-[#155081] text-sm font-medium leading-none text-white opacity-30"
                onClick={() => onSelectTab(tab)}
              >
                {label}
              </div>
            );
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
