import React, { FunctionComponent, useCallback, useRef } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList } from "react-window";

import { NS } from "@/constants/ns";
import { Leader } from "@/services/leaderboard/types";

import { ListItem } from "./components/list-item/ListItem";
import { Tape } from "./components/tape/Tape";

type Props = {
  leaders: Leader[];
};

export const PlayersList: FunctionComponent<Props> = ({ leaders }) => {
  const t = useTranslations(NS.PAGES.TOP_PLAYERS.ROOT);
  const listRef = useRef<VariableSizeList>(null);

  const getItemSize = useCallback((index: number) => {
    return index < 3 ? 60 : 50;
  }, []);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    console.log("🚀 ~ index:", index);
    return (
      <div style={style}>
        <ListItem leader={leaders[index]} />
      </div>
    );
  };

  return (
    <div
      className={classNames(
        "relative z-10 px-4",
        "after:absolute after:left-0 after:top-2 after:z-0 after:h-32 after:w-full after:rounded-[50%] after:bg-[radial-gradient(rgba(68,194,253,1)_0%,rgba(219,157,255,1)_30%)] after:bg-top after:blur-3xl",
      )}
    >
      <div className="relative top-6 z-30 flex justify-center">
        <Tape className="shadow-leaderboard-tape-shadow relative z-20" />
        <div
          className={classNames(
            "text-stroke-1 absolute inset-0 z-30 flex items-center justify-center pb-4 text-center text-2xl font-extrabold leading-4 tracking-wide text-white text-shadow-sm",
          )}
        >
          {t(`${NS.PAGES.TOP_PLAYERS.BEST_PLAYERS}`)}
        </div>
      </div>
      <div className="top-list-shadows relative z-20 flex w-full flex-col items-center rounded-t-4xl bg-top-players-list-pattern px-2 pb-3 pt-5">
        <span
          className={classNames(
            "top-players-badge text-stroke-1 relative mb-2 inline-block self-center rounded-md bg-[#C18700] px-5 py-1 font-extrabold leading-none text-white text-shadow-sm",
            "after:absolute after:left-[3px] after:right-[3px] after:top-[3px] after:h-2.5 after:rounded-t-sm after:bg-white after:opacity-20 after:content-['']",
          )}
        >
          Топ 3
        </span>
        <div className="flex w-full flex-col gap-2 rounded-[20px] bg-[#C18700] px-2 py-3 shadow-leaderbord-list-pattern">
          <ListItem leader={leaders[0]} />
          <ListItem leader={leaders[1]} />
          <ListItem leader={leaders[2]} />
        </div>
      </div>
      <div className="top-players-list-inset-shadows flex w-full flex-col rounded-b-4xl bg-black/50 px-4 pb-5 pt-3">
        <AutoSizer disableWidth>
          {({ height }) => {
            console.log("🚀 ~ height:", height);
            return (
              <VariableSizeList
                ref={listRef}
                height={height}
                itemCount={leaders.length - 3}
                itemSize={getItemSize}
                width="100%"
              >
                {({ index, style }) => <Row index={index + 3} style={style} />}
              </VariableSizeList>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};
