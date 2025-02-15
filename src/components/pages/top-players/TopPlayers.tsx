import React, { useState } from "react";

import { PageWrapper } from "@/components/common";
import { BottomMenu } from "@/components/common/bottom-menu/BottomMenu";
import { useTelegram } from "@/context";

import { LeagueInfo } from "./components/league-info/LeagueInfo";
import { PlayersList } from "./components/players-list/PlayersList";
import { TopPlayersHeader } from "./components/top-players-header/TopPlayersHeader";
import { LeagueEnum } from "./types";

export const TopPlayers = () => {
  const [league, setLeague] = useState(LeagueEnum.LEAGUE);
  const { webApp } = useTelegram();

  if (!webApp) return null;

  return (
    <PageWrapper className="bg-top-players-pattern pb-36" disableSafeAreaInset>
      <TopPlayersHeader
        league={league}
        webApp={webApp}
        onSetLeague={setLeague}
      />
      <LeagueInfo />
      <PlayersList />
      <BottomMenu />
    </PageWrapper>
  );
};
