import { createElement, FunctionComponent, useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { ConfirmationModal } from "@/components/common";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import ArrowIcon from "@/public/assets/svg/arrow.svg";
import { formatNumber } from "@/utils/number";

import { AssignmentCheckModal } from "./components/assignment-check-modal/AssignmentCheckModal";
import { ASSIGNMENTS_ICONS, REWARD_ICONS } from "./constants";
import { AssignmentListItem, AssignmentType } from "./types";

type Props = {
  type?: AssignmentType;
  list: AssignmentListItem[];
};

export const AssignmentsList: FunctionComponent<Props> = ({
  type = AssignmentType.DAILY,
  list,
}) => {
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [isSecondaryModalOpen, setIsSecondaryModalOpen] = useState(false);
  const { handleSelectionChanged } = useHapticFeedback();

  const handleConfirmationModalOpen = () => {
    handleSelectionChanged();
    setIsSecondaryModalOpen(true);
  };

  const handleConfirmationModalClose = () => {
    handleSelectionChanged();
    setOpenModalId(null);
  };

  return (
    <>
      <div className="mt-6 flex flex-col gap-4 px-4">
        <div className="flex items-center justify-between">
          <div className="text-nowrap text-2xl font-black leading-none tracking-[0.04em] text-white">
            {t(`${NS.PAGES.ASSIGNMENTS.TYPES.ROOT}.${type}`)}
          </div>
          <div className="text-nowrap rounded-[20px] bg-blue-700 px-3 py-1 text-xs font-black tracking-[0.04em] text-white">
            {list.length}
          </div>
        </div>
        <ul className="rounded-[18px] border border-solid border-white/10 bg-blue-700 px-4 py-3">
          {list.map(({ icon, id, title, rewards }) => (
            <li
              key={id}
              className={classNames(
                "border-b border-solid border-white/10 py-3",
                "first:pt-0",
                "last:border-none last:pb-0",
              )}
            >
              <motion.div
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="grid grid-cols-[32px_1fr_24px] items-center gap-2"
                onClick={() => {
                  setOpenModalId(id);
                }}
              >
                {createElement(ASSIGNMENTS_ICONS[icon], {
                  className: "size-8 rounded-full object-contain",
                })}
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-black leading-none tracking-wide text-white">
                    {title}
                  </p>
                  <div className="flex gap-2">
                    {rewards.map(({ count, type }) => (
                      <div
                        key={type}
                        className="flex items-center gap-1 text-xs font-extrabold leading-none text-yellow-500"
                      >
                        {createElement(REWARD_ICONS[type], {
                          className: "size-4",
                        })}
                        + {formatNumber(count)}
                      </div>
                    ))}
                  </div>
                </div>

                <ArrowIcon className="ml-auto size-6 stroke-white" />
              </motion.div>
              <AssignmentCheckModal
                id={id}
                icon={icon}
                title={title}
                rewards={rewards}
                isOpen={openModalId === id}
                onClose={handleConfirmationModalClose}
                onConfirmationModalOpen={handleConfirmationModalOpen}
              />
            </li>
          ))}
        </ul>
      </div>

      <ConfirmationModal
        isOpen={isSecondaryModalOpen}
        onClose={handleConfirmationModalOpen}
      />
    </>
  );
};
