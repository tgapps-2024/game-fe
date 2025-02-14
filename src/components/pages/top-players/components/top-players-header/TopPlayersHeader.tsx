import React, { FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import FriendsSVG from "@/public/assets/svg/top-players/friends.svg";
import ShieldSVG from "@/public/assets/svg/top-players/small-shield.svg";
import WorldSVG from "@/public/assets/svg/top-players/world.svg";
import { IWebApp } from "@/types/telegram";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";

import { LeagueEnum } from "../../types";

type Props = {
  league: LeagueEnum;
  webApp: IWebApp;
  onSetLeague: (league: LeagueEnum) => void;
};

export const TopPlayersHeader: FunctionComponent<Props> = ({
  league,
  webApp,
  onSetLeague,
}) => {
  const t = useTranslations(NS.PAGES.TOP_PLAYERS.ROOT);

  const insetTop = getTgSafeAreaInsetTop(webApp);
  const calculatedPaddingTop = insetTop ? insetTop - 32 : 16;

  return (
    <div
      className="fixed left-0 right-0 top-0 flex flex-col rounded-b-4xl bg-white/[1%] px-4 pb-5 backdrop-blur-lg"
      style={{ paddingTop: `${calculatedPaddingTop}px` }}
    >
      <h2 className="text-stroke-1 mb-5 text-center text-lg font-extrabold tracking-wide text-white text-shadow-sm">
        {t(`${NS.PAGES.TOP_PLAYERS.TITLE}`)}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        <button
          className={classNames(
            "relative rounded-xl border border-solid border-black/50 bg-[#6A8098] pb-1 transition-all duration-75",
            "active:scale-[0.98]",
            { "opacity-30": league !== LeagueEnum.LEAGUE },
          )}
          onClick={() => onSetLeague(LeagueEnum.LEAGUE)}
        >
          <div
            className={classNames(
              "relative flex items-center justify-center gap-2 rounded-xl bg-[#C9D7F1] py-2.5 text-sm font-semibold text-[#6A8098] shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.5),inset_0_-1px_0_0_rgba(255,255,255,0.8)]",
              "after:absolute after:left-[3px] after:right-[3px] after:top-[3px] after:h-4 after:rounded-t-[10px] after:bg-white after:opacity-10 after:content-['']",
            )}
          >
            <ShieldSVG className="size-4" />
            <span className="relative z-10">
              {t(
                `${NS.PAGES.TOP_PLAYERS.MENU_ITEMS.ROOT}.${NS.PAGES.TOP_PLAYERS.MENU_ITEMS.LEAGUE}`,
              )}
            </span>
          </div>
        </button>
        <button
          className={classNames(
            "rounded-xl border border-solid border-black/50 bg-[#6A8098] pb-1 transition-all duration-75",
            "active:scale-[0.98]",
            { "opacity-30": league !== LeagueEnum.WORLD },
          )}
          onClick={() => onSetLeague(LeagueEnum.WORLD)}
        >
          <div
            className={classNames(
              "relative flex items-center justify-center gap-2 rounded-xl bg-[#C9D7F1] py-2.5 text-sm font-semibold text-[#6A8098] shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.5),inset_0_-1px_0_0_rgba(255,255,255,0.8)]",
              "after:absolute after:left-[3px] after:right-[3px] after:top-[3px] after:h-4 after:rounded-t-[10px] after:bg-white after:opacity-10 after:content-['']",
            )}
          >
            <WorldSVG className="size-4" />
            <span className="relative z-10">
              {t(
                `${NS.PAGES.TOP_PLAYERS.MENU_ITEMS.ROOT}.${NS.PAGES.TOP_PLAYERS.MENU_ITEMS.WORLD}`,
              )}
            </span>
          </div>
        </button>
        <button
          className={classNames(
            "rounded-xl border border-solid border-black/50 bg-[#6A8098] pb-1 transition-all duration-75",
            "active:scale-[0.98]",
            { "opacity-30": league !== LeagueEnum.FRIENDS },
          )}
          onClick={() => onSetLeague(LeagueEnum.FRIENDS)}
        >
          <div
            className={classNames(
              "relative flex items-center justify-center gap-2 rounded-xl bg-[#C9D7F1] py-2.5 text-sm font-semibold text-[#6A8098] shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.5),inset_0_-1px_0_0_rgba(255,255,255,0.8)]",
              "after:absolute after:left-[3px] after:right-[3px] after:top-[3px] after:h-4 after:rounded-t-[10px] after:bg-white after:opacity-10 after:content-['']",
            )}
          >
            <FriendsSVG className="h-4 w-5" />
            <span className="relative z-10">
              {t(
                `${NS.PAGES.TOP_PLAYERS.MENU_ITEMS.ROOT}.${NS.PAGES.TOP_PLAYERS.MENU_ITEMS.FRIENDS}`,
              )}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
