import React, { useRef, useState } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";

import { Card } from "@/components/common";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import CargoImage from "@/public/assets/png/cargo.webp";
import CloseIcon from "@/public/assets/svg/close.svg";
import { NotificationEnum } from "@/types/telegram";

import { Badge } from "./components/badge/Badge";
import { CARDS } from "./cards.data";

export const InviteModal = () => {
  const t = useTranslations(NS.PAGES.FRIENDS.ROOT);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const { handleSelectionChanged, handleNotificationOccurred } =
    useHapticFeedback();
  const cardRef = useRef(null);

  const handleCardClick = (index: number) => {
    handleSelectionChanged();
    setSelectedCard(index);
  };

  return (
    <DrawerContent className="flex w-full flex-col items-center rounded-t-3xl border-white/10 bg-blue-700 px-4 pb-8 pt-9 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
      <DrawerClose>
        <motion.button
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full"
        >
          <CloseIcon />
        </motion.button>
      </DrawerClose>

      <DrawerTitle className="!text-stroke-1 mb-3 text-center !text-2xl !font-black uppercase leading-none !tracking-wide text-white !text-shadow-sm">
        {t(`${NS.PAGES.FRIENDS.MODAL.ROOT}.${NS.PAGES.FRIENDS.MODAL.TITLE}`)}
      </DrawerTitle>
      <DrawerDescription className="mb-6 text-center text-sm font-medium leading-3 tracking-wide text-gray-550">
        {t(
          `${NS.PAGES.FRIENDS.MODAL.ROOT}.${NS.PAGES.FRIENDS.MODAL.DESCRIPTION}`,
        )}
      </DrawerDescription>
      <div className="flex w-full flex-col items-center">
        <div className="relative mb-8 grid w-full grid-cols-3 gap-2">
          {CARDS.map((card, index) => (
            <Card
              ref={cardRef}
              key={`buy_friends_card_${index}`}
              buttonText={card.buttonText}
              type={card.type}
              isSelected={index === selectedCard}
              badgeComponent={<Badge value={card.badgeValue} />}
              onClick={() => handleCardClick(index)}
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                {index === 0 && (
                  <div className="absolute -bottom-4 h-full w-full">
                    <Image src={CargoImage} alt="" fill />
                  </div>
                )}
                <span className="text-stroke-1 absolute bottom-6 left-1/2 z-20 w-full -translate-x-1/2 text-center text-xs font-bold text-shadow-sm">
                  {t(
                    `${NS.PAGES.FRIENDS.MODAL.ROOT}.${NS.PAGES.FRIENDS.MODAL.FRIENDS}`,
                    { number: card.number },
                  )}
                </span>
              </div>
            </Card>
          ))}
        </div>
        <PrimaryButton
          variant="secondary"
          className="w-full uppercase"
          disabled={selectedCard === null}
          onClick={() => {
            if (selectedCard === null) {
              handleSelectionChanged();
            } else {
              handleNotificationOccurred(NotificationEnum.ERROR);
            }
          }}
        >
          {t(NS.PAGES.FRIENDS.GET_FRIENDS)}
        </PrimaryButton>
      </div>
    </DrawerContent>
  );
};
