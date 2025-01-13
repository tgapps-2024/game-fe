import React, { useState } from "react";

import classNames from "classnames";
import { motion } from "framer-motion";

import { Modal, Timeline } from "@/components/common";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import CloseIcon from "@/public/assets/svg/close.svg";
import ExternalSVG from "@/public/assets/svg/external.svg";
import { formatNumber } from "@/utils/number";

import { REWARD_ICONS } from "../../constants";
import { AssignmentListItem } from "../../types";

type Props = AssignmentListItem & {
  isOpen: boolean;
  onClose: () => void;
  onConfirmationModalOpen: () => void;
};

export const AssignmentCheckModal = ({
  title,
  rewards,
  isOpen,
  onClose,
  onConfirmationModalOpen,
}: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const { handleSelectionChanged } = useHapticFeedback();

  const handleClicked = () => {
    handleSelectionChanged();
    setIsClicked(true);
  };

  return (
    <Modal
      isVisible={isOpen}
      onClose={onClose}
      className="relative flex w-full flex-col items-center rounded-t-4xl border-2 border-b-0 border-white/10 bg-blue-700 px-4 pb-8 pt-9"
    >
      <motion.button
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-white/5"
      >
        <CloseIcon />
      </motion.button>
      <div className="mb-6 flex size-23 items-center justify-center rounded-full bg-white/20 object-contain text-sm text-white">
        Place for icon
      </div>

      <h3 className="text-stroke-1 mb-3 text-center text-[28px] font-black uppercase leading-none tracking-[0.04em] text-white text-shadow">
        {title}
      </h3>
      <div
        className={classNames(
          "mx-auto mb-3 flex gap-2 self-start rounded-full bg-blue-800/50 px-3 py-1",
        )}
      >
        {rewards.map(({ count, type }) => (
          <div
            key={type}
            className="flex items-center gap-1 font-extrabold leading-none text-yellow-500"
          >
            {React.createElement(REWARD_ICONS[type], {
              className: "size-4",
            })}
            + {formatNumber(count)}
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col gap-4 rounded-2xl bg-white/5 p-4">
        <Timeline
          items={[
            {
              id: 1,
              description: (
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium leading-none text-gray-550">
                    Выполните задание
                  </p>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      handleClicked();
                      window.open("https://t.me/noname_channel", "_blank");
                    }}
                    className="text-stroke-1 flex items-baseline gap-1 text-sm font-extrabold uppercase leading-none tracking-wide text-white text-shadow-sm"
                  >
                    boost noname channel
                    <ExternalSVG className="size-4" />
                  </button>
                </div>
              ),
            },
            {
              id: 2,
              description: (
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium leading-none text-gray-550">
                    Нажмите ниже, чтобы отправить его на проверку.
                  </p>
                </div>
              ),
            },
          ]}
        />
        <motion.button
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          disabled={!isClicked}
          className={classNames(
            "group z-10 h-[56px] w-full cursor-pointer overflow-hidden rounded-2xl shadow-inset-black",
            { "bg-blue-800 pb-0": !isClicked },
            { "bg-[#0655a4] pb-[3px]": isClicked },
          )}
        >
          <div
            className={classNames(
              "mx-auto flex h-13 w-[99%] items-center justify-center rounded-xl p-[3px] pb-1",
              { "bg-blue-800 shadow-none": !isClicked },
              { "bg-[#0075ff] shadow-inset-btn": isClicked },
            )}
          >
            <div
              className={classNames(
                "text-stroke-1 flex h-11 w-full items-center justify-center gap-1 rounded-xl p-3 text-center font-black uppercase tracking-wide text-white text-shadow-sm",
                { "bg-blue-800/100 shadow-none": !isClicked },
                { "bg-white/15 shadow-link": isClicked },
              )}
              onClick={onConfirmationModalOpen}
            >
              Проверить задание
            </div>
          </div>
        </motion.button>
      </div>
    </Modal>
  );
};
