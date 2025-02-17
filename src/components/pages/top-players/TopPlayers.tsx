import React, { useState } from "react";

import { PageWrapper } from "@/components/common";
import { BottomMenu } from "@/components/common/bottom-menu/BottomMenu";
import { useTelegram } from "@/context";
import { useGetLeaderboard } from "@/services/leaderboard/fetcher";
import { LeaderboardEnum } from "@/services/leaderboard/types";

import { LeagueInfo } from "./components/league-info/LeagueInfo";
import { PlayersList } from "./components/players-list/PlayersList";
import { RewardsBlock } from "./components/rewards-block/RewardsBlock";
import { TimerBlock } from "./components/timer-block/TimerBlock";
import { TopPlayersHeader } from "./components/top-players-header/TopPlayersHeader";

export const TopPlayers = () => {
  const [league, setLeague] = useState(LeaderboardEnum.LEAGUE);
  const { webApp } = useTelegram();
  const { data, isLoading } = useGetLeaderboard(league);

  if (!webApp) return null;

  return (
    <PageWrapper
      isLoading={isLoading}
      className="bg-top-players-pattern pb-36"
      disableSafeAreaInset
    >
      <TopPlayersHeader
        league={league}
        webApp={webApp}
        onSetLeague={setLeague}
      />
      <LeagueInfo />
      <PlayersList leaders={data?.leaders || []} />
      <TimerBlock />
      <RewardsBlock />
      <BottomMenu />
    </PageWrapper>
  );
};
