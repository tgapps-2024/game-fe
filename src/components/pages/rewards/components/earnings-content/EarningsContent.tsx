import React, { useMemo } from "react";

import { toast } from "sonner";

import { Toast } from "@/components/ui/toast";
import { useUpgradeCard } from "@/services/rewards/queries";
import { DataStructure, Events as EventsType } from "@/services/rewards/types";
import { useQueryClient } from "@tanstack/react-query";

import { Combo } from "./components/combo/Combo";
import { Events } from "./components/events/Events";
import { mergeCards, prepareCards, prepareEvents } from "./helpers";

type Props = {
  isActive: boolean;
  cards: DataStructure;
  appsCards: EventsType;
};

export const EarningsContent = ({ isActive, cards, appsCards }: Props) => {
  const { mutate: upgradeCard } = useUpgradeCard(useQueryClient());
  const preparedCards = useMemo(() => prepareCards(cards.cards), [cards.cards]);

  const preparedEvents = useMemo(
    () => prepareEvents(appsCards, preparedCards),
    [appsCards, preparedCards],
  );

  const mergedCards = useMemo(
    () => mergeCards(preparedEvents, preparedCards),
    [preparedCards, preparedEvents],
  );

  const handleUpgradeCard = (name: string) => {
    upgradeCard(name, {
      onSuccess: () => {
        toast(<Toast type="done" text="Карта обновлена" />);
      },
      onError: () => {
        toast(<Toast type="destructive" text="Что-то пошло не так" />);
      },
    });
  };

  return (
    <div className="mx-4 mb-6 flex flex-col gap-[30px]">
      <Combo isAnimated={isActive} cards={cards} />
      <Events
        isAnimated={isActive}
        appsCards={mergedCards}
        onUpgradeCard={handleUpgradeCard}
      />
    </div>
  );
};
