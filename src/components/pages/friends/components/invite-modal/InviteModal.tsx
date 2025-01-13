import React, { useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { Card, Modal } from "@/components/common";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import CargoImage from "@/public/assets/png/cargo.svg";
import CloseIcon from "@/public/assets/svg/close.svg";

import { Badge } from "./components/badge/Badge";
import { CARDS } from "./cards.data";

interface IInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const animationVariants = {
  hidden: { opacity: 0, y: 50 }, // Карточка скрыта и находится ниже
  visible: {
    opacity: 1,
    y: 0, // Карточка "выезжает" вверх
    transition: { duration: 0.5 },
  },
};

export const InviteModal = ({ isOpen, onClose }: IInviteModalProps) => {
  const t = useTranslations(NS.PAGES.FRIENDS.ROOT);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const { handleSelectionChanged } = useHapticFeedback();

  const handleCardClick = (index: number) => {
    handleSelectionChanged();
    setSelectedCard(index);
  };

  return (
    <Modal
      isVisible={isOpen}
      onClose={onClose}
      className="relative flex w-full flex-col items-center overflow-hidden rounded-t-3xl border-2 border-solid border-white/10 bg-blue-700 px-4 pb-8 pt-14 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]"
    >
      <motion.button
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-white/5"
      >
        <CloseIcon />
      </motion.button>
      <div className="flex flex-col items-center">
        <h2 className="text-stroke-1 mb-3 text-center text-2xl font-black uppercase leading-none tracking-wide text-white text-shadow-sm">
          {t(`${NS.PAGES.FRIENDS.MODAL.ROOT}.${NS.PAGES.FRIENDS.MODAL.TITLE}`)}
        </h2>
        <p className="mb-6 text-center text-sm font-medium leading-3 tracking-wide text-gray-550">
          {t(
            `${NS.PAGES.FRIENDS.MODAL.ROOT}.${NS.PAGES.FRIENDS.MODAL.DESCRIPTION}`,
          )}
        </p>
        <div className="relative mb-8 grid w-full grid-cols-3 gap-2">
          {CARDS.map((card, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={animationVariants}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
            >
              <Card
                buttonText={card.buttonText}
                type={card.type}
                isSelected={index === selectedCard}
                badgeComponent={<Badge value={card.badgeValue} />}
                onClick={() => handleCardClick(index)}
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  {index === 0 && (
                    <CargoImage className="absolute -bottom-4 h-full w-full" />
                  )}
                  <span className="text-stroke-1 absolute bottom-6 left-1/2 z-20 w-full -translate-x-1/2 text-center text-xs font-bold text-shadow-sm">
                    {t(
                      `${NS.PAGES.FRIENDS.MODAL.ROOT}.${NS.PAGES.FRIENDS.MODAL.FRIENDS}`,
                      { number: card.number },
                    )}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          disabled={selectedCard === null}
          className={classNames(
            "group z-10 h-[56px] w-full cursor-pointer overflow-hidden rounded-2xl shadow-inset-black",
            { "bg-blue-800 pb-0": selectedCard === null },
            { "bg-[#0655a4] pb-[3px]": selectedCard !== null },
          )}
          onClick={() => {
            handleSelectionChanged();
          }}
        >
          <div
            className={classNames(
              "mx-auto flex h-13 w-[99%] items-center justify-center rounded-xl p-[3px] pb-1",
              { "bg-blue-800 shadow-none": selectedCard === null },
              { "bg-[#0075ff] shadow-inset-btn": selectedCard !== null },
            )}
          >
            <div
              className={classNames(
                "text-stroke-1 flex h-11 w-full items-center justify-center gap-1 rounded-xl p-3 text-center font-black uppercase tracking-wide text-white text-shadow-sm",
                { "bg-blue-800/100 shadow-none": selectedCard === null },
                { "bg-white/15 shadow-link": selectedCard !== null },
              )}
              onClick={onClose}
            >
              {t(NS.PAGES.FRIENDS.GET_FRIENDS)}
            </div>
          </div>
        </motion.button>
      </div>
    </Modal>
  );
};
