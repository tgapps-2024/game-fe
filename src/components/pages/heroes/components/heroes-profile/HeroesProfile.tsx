import React, { useContext } from "react";

import { AxiosError } from "axios";
import { toast } from "sonner";

import { ProfileHeader } from "@/components/common";
import { Toast } from "@/components/ui/toast";
import { useTelegram } from "@/context";
import { HeroesContext } from "@/context/heroes-context/HeroesContext";
import { useSafeCoinsPayment } from "@/hooks/useSafeCoinsPayment";
import { useSafeStarsPayment } from "@/hooks/useSafeStarsPayment";
import {
  updateGetAllHeroesQuery,
  useBuyHero,
  useGetAllHeroes,
  useSetHero,
} from "@/services/heroes/queries";
import { HeroCurrency, HeroId } from "@/services/heroes/types";
import { invalidateProfileQuery } from "@/services/profile/queries";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";
import { useQueryClient } from "@tanstack/react-query";

import { HeroStats, HeroStatsCtaType } from "./components/hero-stats/HeroStats";
import { HeroView } from "./components/hero-view/HeroView";

export const HeroesProfile = () => {
  const { webApp } = useTelegram();

  const queryClient = useQueryClient();

  const { selection, currentHero } = useContext(HeroesContext);
  const { data: ownHeroes, isPending: isOwnHeroesPending } = useGetAllHeroes();
  const { mutate: setProfileHero, isPending: isSettingProfileHero } =
    useSetHero(
      () => {
        invalidateProfileQuery(queryClient);
      },
      (error: AxiosError) => {
        toast(
          <Toast
            type="destructive"
            text={`Hero selection has failed: ${error.message}`}
          />,
        );
      },
    );
  const { mutate: buyHero, isPending: isBuyingHero } = useBuyHero(
    (response: HeroId) => {
      updateGetAllHeroesQuery(queryClient, response);
      toast(<Toast type="done" text="Buying hero has complete!" />);
    },
    (error: AxiosError) => {
      toast(
        <Toast
          type="destructive"
          text={`Buing hero has failed: ${error.message}`}
        />,
      );
    },
  );

  const { buy: tryBuyStarsHero } = useSafeStarsPayment(
    () => {
      if (selection.hero) {
        buyHero(selection.hero.characterId);
      }
    },
    () => {
      if (selection.hero) {
        buyHero(selection.hero.characterId);
      }
    },
    () => {},
  );

  const tryBuyCoinsHero = useSafeCoinsPayment(() => {
    if (selection.hero) {
      buyHero(selection.hero.characterId);
    }
  });

  if (!webApp) return null;

  const insetTop = getTgSafeAreaInsetTop(webApp);

  const isCurrentHeroSelected =
    currentHero &&
    selection?.hero &&
    currentHero.characterId === selection.hero.characterId;

  const isSelectableHero =
    !isCurrentHeroSelected &&
    !!ownHeroes?.find((heroId) => heroId === selection?.hero?.characterId);

  let ctaType = HeroStatsCtaType.BUY;

  if (isCurrentHeroSelected) {
    ctaType = HeroStatsCtaType.SELECTED;
  } else if (isSelectableHero) {
    ctaType = HeroStatsCtaType.SELECT;
  }

  return (
    <div
      className="relative aspect-[0.78] bg-[url('/assets/png/heroes/bg.webp')] bg-cover bg-[32%_center] bg-no-repeat pt-28"
      style={insetTop ? { paddingTop: insetTop } : undefined}
    >
      <ProfileHeader />

      <div className="absolute bottom-[10%] w-full pt-[77%]">
        {selection?.hero && (
          <HeroView
            className="left-0 top-0 h-full w-[56%]"
            heroId={selection.hero.characterId}
            heroRarity={selection.hero.rarity}
            source="preview"
          />
        )}
        {selection?.hero && !isOwnHeroesPending && (
          <HeroStats
            heroId={selection.hero.characterId}
            energy={selection.hero.energy}
            earnPerHour={selection.hero.earn_per_hour}
            earnPerTap={selection.hero.earn_per_tap}
            heroRarity={selection.hero.rarity}
            ctaType={ctaType}
            isCtaLoading={isBuyingHero || isSettingProfileHero}
            onCtaClick={
              !isCurrentHeroSelected
                ? () => {
                    if (selection.hero) {
                      if (isSelectableHero) {
                        setProfileHero(selection.hero.characterId);
                      } else if (
                        selection.hero.currency === HeroCurrency.STARS
                      ) {
                        tryBuyStarsHero(selection.hero.price);
                      } else {
                        tryBuyCoinsHero(selection.hero.price);
                      }
                    }
                  }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
};
