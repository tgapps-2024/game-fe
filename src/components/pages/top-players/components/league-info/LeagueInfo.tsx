import React, { createElement } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";

import { LEAGUE_TYPES } from "./constants";

export const LeagueInfo = () => {
  const t = useTranslations(NS.PAGES.TOP_PLAYERS.ROOT);

  return (
    <div className="mt-30 w-full px-4">
      <div className="grid w-full grid-cols-[48px_48px_84px_48px_48px] items-center justify-center gap-5 pb-5">
        {Object.values(LEAGUE_TYPES).map((icon, index) =>
          createElement(icon, {
            className: classNames("w-full h-auto", {
              "mt-12":
                index === 0 || index === Object.values(LEAGUE_TYPES).length - 1,
              "mt-4":
                index === 1 || index === Object.values(LEAGUE_TYPES).length - 2,
            }),
          }),
        )}
      </div>
      <h3 className="text-stroke-1 mb-2 text-center text-2xl font-black tracking-wide text-white text-shadow-sm">
        {t(
          `${NS.PAGES.TOP_PLAYERS.TOURNAMENTS.ROOT}.${NS.PAGES.TOP_PLAYERS.TOURNAMENTS.DIAMOND}`,
        )}
      </h3>
      <p className="text-medium text-center text-sm text-white/50">
        {t(
          `${NS.PAGES.TOP_PLAYERS.TOURNAMENTS.ROOT}.${NS.PAGES.TOP_PLAYERS.TOURNAMENTS.DESCRIPTION}`,
        )}
      </p>
    </div>
  );
};
