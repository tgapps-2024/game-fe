import React from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { NS } from "@/constants/ns";

export const InviteButton = () => {
  const t = useTranslations(NS.PAGES.FRIENDS.ROOT);

  return (
    <div className="mx-4">
      <motion.button
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={classNames(
          "group h-14 w-full cursor-pointer overflow-hidden rounded-2xl border border-black bg-[#009F00] pb-[3px]",
        )}
        onClick={() => {}}
      >
        <div
          className={classNames(
            "shadow-inner-btn flex h-full w-full items-center justify-center rounded-xl bg-[#02DB07] p-[3px] pb-1",
          )}
        >
          <div
            className={classNames(
              "shadow-a text-stroke-1 flex h-full w-full items-center rounded-xl px-5 text-lg font-black uppercase leading-none tracking-wide text-shadow-sm",
              "justify-center bg-white/20",
            )}
          >
            {t(NS.PAGES.FRIENDS.GET_FRIENDS)}
          </div>
        </div>
      </motion.button>
    </div>
  );
};
