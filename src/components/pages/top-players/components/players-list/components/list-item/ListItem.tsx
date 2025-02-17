import React, { FunctionComponent } from "react";

import classNames from "classnames";

import { Leader } from "@/services/leaderboard/types";

import { PlayerAvatar } from "./components/player-avatar/PlayerAvatar";
import { PlayerInfo } from "./components/player-info/PlayerInfo";
import { PlayerValue } from "./components/player-value/PlayerValue";
import { Rank } from "./components/rank/Rank";

type Props = {
  leader: Leader;
};

export const ListItem: FunctionComponent<Props> = ({
  leader: { rank, name, photo_url, value },
}) => {
  return (
    <div
      className={classNames(
        "relative rounded-xl border border-solid border-black/50 bg-[#6A8098] pb-1 transition-all duration-75",
      )}
    >
      <div
        className={classNames(
          "relative flex w-full items-center gap-2 rounded-xl bg-[#C9D7F1] p-2 py-2.5 text-sm font-semibold text-[#6A8098] shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.5),inset_0_-1px_0_0_rgba(255,255,255,0.8)]",
          "after:absolute after:left-[3px] after:right-[3px] after:top-[3px] after:h-4 after:rounded-t-[10px] after:bg-white after:opacity-10 after:content-['']",
        )}
      >
        <div className="relative z-10 flex w-full gap-2">
          <Rank rank={rank} />
          <PlayerAvatar url={photo_url} />
          <PlayerInfo name={name} league="League name" />
          <PlayerValue value={value} />
        </div>
      </div>
    </div>
  );
};
