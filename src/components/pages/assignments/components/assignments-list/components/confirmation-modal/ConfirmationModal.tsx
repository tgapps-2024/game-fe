import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { Modal } from "@/components/common";
import { NS } from "@/constants/ns";
import ErrorImage from "@/public/assets/png/error.webp";
import CloseIcon from "@/public/assets/svg/close.svg";
import DividerSVG from "@/public/assets/svg/divider.svg";
import StarSVG from "@/public/assets/svg/star.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ConfirmationModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
}) => {
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);

  return (
    <Modal
      isVisible={isOpen}
      onClose={onClose}
      className="relative flex w-full flex-col items-center rounded-t-4xl border-2 border-white/10 bg-blue-700 px-4 pb-8 pt-12"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex size-6 items-center justify-center rounded-full bg-white/5"
      >
        <CloseIcon className="size-2.5" />
      </button>
      <div className="relative mb-6 aspect-video w-full">
        <Image src={ErrorImage} alt="error" fill />
      </div>

      <h3 className="text-stroke-1 mb-3 text-center text-2xl font-black uppercase text-shadow-sm">
        {t(
          `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.TITLE}`,
        )}
      </h3>
      <p className="mb-3 text-center text-xs font-medium leading-none text-gray-550">
        {t(
          `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.DESCRIPTION}`,
        )}
      </p>
      <div className="mb-8 grid w-full grid-cols-[1fr_32px_1fr] items-center rounded-2xl bg-white/5 p-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <StarSVG className="size-7" />
          <span className="text-stroke-1 text-center font-extrabold uppercase leading-none text-yellow-500 text-shadow-sm">
            +500.000
          </span>
          <span className="text-xs font-medium leading-none tracking-wide text-gray-550">
            {t(
              `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.AWARD}`,
            )}
          </span>
        </div>
        <div>
          <DividerSVG />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <StarSVG className="size-7" />
          <span className="text-stroke-1 text-center font-extrabold uppercase leading-none text-red-500 text-shadow-sm">
            +1.000.000
          </span>
          <span className="text-xs font-medium leading-none tracking-wide text-gray-550">
            {t(
              `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.PENALTY}`,
            )}
          </span>
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        onClick={onClose}
        className={classNames(
          "shadow-inset-black group z-10 mb-4 h-[56px] w-full cursor-pointer overflow-hidden rounded-2xl bg-[#0655a4] pb-[3px]",
        )}
      >
        <div
          className={classNames(
            "shadow-inset-btn flex h-13 w-full items-center justify-center rounded-xl bg-[#0075ff] p-[3px] pb-1",
          )}
        >
          <div
            className={classNames(
              "text-stroke-1 shadow-link flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-white/15 p-3 text-center font-black uppercase tracking-wide text-shadow-sm",
            )}
          >
            {t(
              `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.BUTTON}`,
            )}
          </div>
        </div>
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        onClick={onClose}
        className="text-sm font-bold uppercase leading-none tracking-wide text-white"
      >
        {t(
          `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.DOUBLE_CHECK}`,
        )}
      </motion.button>
    </Modal>
  );
};
