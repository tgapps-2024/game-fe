import React from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";

import { ListItem } from "./components/list-item/ListItem";
import { Tape } from "./components/tape/Tape";

export const PlayersList = () => {
  const t = useTranslations(NS.PAGES.TOP_PLAYERS.ROOT);

  return (
    <div
      className={classNames(
        "relative z-10 px-4",
        "after:absolute after:left-0 after:top-2 after:z-0 after:h-32 after:w-full after:rounded-[50%] after:bg-[radial-gradient(rgba(68,194,253,1)_0%,rgba(219,157,255,1)_30%)] after:bg-top after:blur-3xl",
      )}
    >
      <div className="relative flex justify-center">
        <Tape className="relative z-20" />
        <div
          className={classNames(
            "text-stroke-1 absolute inset-0 z-30 flex items-center justify-center pb-4 text-center text-2xl font-extrabold leading-4 tracking-wide text-white text-shadow-sm",
          )}
        >
          {t(`${NS.PAGES.TOP_PLAYERS.BEST_PLAYERS}`)}
        </div>
      </div>
      <div className="bg-top-players-list-pattern top-list-shadows relative z-20 flex w-full flex-col items-center rounded-t-4xl px-2 pb-3 pt-5">
        <span
          className={classNames(
            "top-players-badge text-stroke-1 relative mb-2 inline-block self-center rounded-md bg-[#C18700] px-5 py-1 font-extrabold leading-none text-white text-shadow-sm",
            "after:absolute after:left-[3px] after:right-[3px] after:top-[3px] after:h-2.5 after:rounded-t-sm after:bg-white after:opacity-20 after:content-['']",
          )}
        >
          Топ 3
        </span>
        <div className="shadow-leaderbord-list-pattern flex w-full flex-col gap-2 rounded-[20px] bg-[#C18700] px-2 py-3">
          <ListItem rank={1} />
          <ListItem rank={2} />
          <ListItem rank={3} />
        </div>
      </div>
      <div className="top-players-list-inset-shadows flex w-full flex-col gap-2 rounded-b-4xl bg-black/50 px-4 pb-5 pt-3">
        {Array.from({ length: 280 }, (_, index) => index + 4).map((rank) => (
          <ListItem key={rank} rank={rank} />
        ))}
      </div>
    </div>
  );
};
