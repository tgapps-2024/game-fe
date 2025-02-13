import React, { useContext } from "react";

import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  HeroStats,
  HeroStatsCtaType,
  HeroView,
  HSProfile,
} from "@/components/hs-shared";
import { Toast } from "@/components/ui/toast";
import { HSSharedContext } from "@/context/hs-shared-context/HSSharedContext";
import { useSafeCoinsPayment } from "@/hooks/useSafeCoinsPayment";
import { useSafeStarsPayment } from "@/hooks/useSafeStarsPayment";
import {
  updateGetAllHeroesWithClothQuery,
  updateGetClothHeroQuery,
  useBuyCloth,
  useGetClothHeroQuery,
  useSetCloth,
} from "@/services/heroes/queries";
import { ClothFetcherParams, HeroCurrency } from "@/services/heroes/types";
import { invalidateProfileQuery } from "@/services/profile/queries";
import { useQueryClient } from "@tanstack/react-query";

export const ShopProfile = () => {
  const queryClient = useQueryClient();

  const { selection, currentHero } = useContext(HSSharedContext);
  const { data: heroOwnCloth } = useGetClothHeroQuery(
    selection.hero?.characterId,
  );

  const { mutate: selectCloth, isPending: isSettingCloth } = useSetCloth(
    (response: ClothFetcherParams) => {
      invalidateProfileQuery(queryClient);
      updateGetAllHeroesWithClothQuery(
        queryClient,
        response.heroId,
        response.clothPiece,
        response.clothId,
      );

      toast(<Toast type="done" text="Setting cloth has complete!" />);
    },
    (error: AxiosError) => {
      toast(
        <Toast
          type="destructive"
          text={`Cloth selection has failed: ${error.message}`}
        />,
      );
    },
  );

  const { mutate: buyCloth, isPending: isBuyingCloth } = useBuyCloth(
    (response: ClothFetcherParams) => {
      invalidateProfileQuery(queryClient);
      updateGetClothHeroQuery(
        queryClient,
        response.heroId,
        response.clothPiece,
        response.clothId,
      );

      toast(<Toast type="done" text="Buying cloth has complete!" />);
    },
    (error: AxiosError) => {
      toast(
        <Toast
          type="destructive"
          text={`Buying cloth has failed: ${error.message}`}
        />,
      );
    },
  );

  const { buy: tryBuyStarsCloth, isStarsPaymentLoading } = useSafeStarsPayment(
    () => {
      if (selection.hero && selection.cloth) {
        buyCloth({
          heroId: selection.hero.characterId,
          clothPiece: selection.cloth.clothPiece,
          clothId: selection.cloth.id,
        });
      }
    },
    () => {
      if (selection.hero && selection.cloth) {
        buyCloth({
          heroId: selection.hero.characterId,
          clothPiece: selection.cloth.clothPiece,
          clothId: selection.cloth.id,
        });
      }
    },
  );

  const tryBuyCoinsHero = useSafeCoinsPayment(() => {
    if (selection.hero && selection.cloth) {
      buyCloth({
        heroId: selection.hero.characterId,
        clothPiece: selection.cloth.clothPiece,
        clothId: selection.cloth.id,
      });
    }
  });

  let ctaType = HeroStatsCtaType.BUY;
  let isSelectableCloth = false;

  if (!selection?.cloth) {
    ctaType = HeroStatsCtaType.SELECTED;
  } else {
    const { cloth } = selection;
    const isCurrentClothPieceSelected =
      currentHero?.cloth[cloth.clothPiece] === cloth.id;

    isSelectableCloth =
      !isCurrentClothPieceSelected &&
      !!heroOwnCloth?.cloth[cloth.clothPiece].includes(
        selection.hero?.cloth?.[cloth.clothPiece] as number,
      );

    if (isCurrentClothPieceSelected) {
      ctaType = HeroStatsCtaType.SELECTED;
    } else if (isSelectableCloth) {
      ctaType = HeroStatsCtaType.SELECT;
    }
  }

  return (
    <HSProfile
      HeroViewNode={
        selection?.hero && (
          <HeroView
            className="left-0 top-0 h-full w-[56%]"
            heroId={selection.hero.characterId}
            heroRarity={selection.hero.rarity}
            heroCloth={selection.hero.cloth}
            source="preview"
          />
        )
      }
      HeroStatsNode={
        selection?.hero && (
          <HeroStats
            heroId={selection.hero.characterId}
            energy={selection.hero.energy}
            earnPerHour={selection.hero.earn_per_hour}
            earnPerTap={selection.hero.earn_per_tap}
            heroRarity={selection.hero.rarity}
            source="shop"
            ctaType={ctaType}
            isCtaLoading={
              isSettingCloth || isBuyingCloth || isStarsPaymentLoading
            }
            onCtaClick={
              ctaType !== HeroStatsCtaType.SELECTED
                ? () => {
                    const { hero, cloth } = selection;

                    if (hero && cloth) {
                      if (ctaType === HeroStatsCtaType.SELECT) {
                        selectCloth({
                          heroId: hero.characterId,
                          clothPiece: cloth.clothPiece,
                          clothId: cloth.id,
                        });
                      } else if (
                        cloth?.currency === HeroCurrency.STARS
                      ) {
                        tryBuyStarsCloth(cloth.price);
                      } else {
                        tryBuyCoinsHero(cloth.price);
                      }
                    }
                  }
                : undefined
            }
            isShopLinkHidden
          />
        )
      }
    />
  );
};
