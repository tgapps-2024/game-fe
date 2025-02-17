import React, { useState } from "react";

import { PageWrapper } from "@/components/common";
import { BottomMenu } from "@/components/common/bottom-menu/BottomMenu";
import { useTelegram } from "@/context";
import { useInfiniteLeaderboard } from "@/services/leaderboard/queries";
import { LeaderboardEnum } from "@/services/leaderboard/types";

import { LeagueInfo } from "./components/league-info/LeagueInfo";
import { PlayersList } from "./components/players-list/PlayersList";
import { RewardsBlock } from "./components/rewards-block/RewardsBlock";
import { TimerBlock } from "./components/timer-block/TimerBlock";
import { TopPlayersHeader } from "./components/top-players-header/TopPlayersHeader";

export const TopPlayers = () => {
  const [league, setLeague] = useState(LeaderboardEnum.LEAGUE);
  const { webApp } = useTelegram();

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteLeaderboard(league);
  if (!webApp) return null;

  return (
    <PageWrapper
      className="bg-top-players-pattern pb-36"
      disableSafeAreaInset
      id="top-players"
    >
      <TopPlayersHeader
        league={league}
        webApp={webApp}
        onSetLeague={setLeague}
      />
      <LeagueInfo />
      {!isLoading ? (
        <PlayersList
          leaders={data?.pages.flatMap((page) => page.leaders) || []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      ) : null}
      <TimerBlock />
      <RewardsBlock />
      <BottomMenu />
    </PageWrapper>
  );
};
