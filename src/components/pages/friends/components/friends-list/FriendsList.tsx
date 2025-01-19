import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";

import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import StarSVG from "@/public/assets/svg/star.svg";
import { IReferals } from "@/services/profile/types";

type Props = {
  referalsData: IReferals;
};

export const FriendsList: FunctionComponent<Props> = ({ referalsData }) => {
  const t = useTranslations(NS.PAGES.FRIENDS.ROOT);
  const { handleSelectionChanged } = useHapticFeedback();

  return (
    <motion.div
      className="relative -top-4 px-4 pb-20 text-white"
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="text-stroke-1 text-nowrap text-2xl font-black leading-none tracking-[0.04em] text-white text-shadow-sm">
          {t(NS.PAGES.FRIENDS.TITLE)}
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-550">
          {t(NS.PAGES.FRIENDS.INVITED)}{" "}
          <div className="text-nowrap rounded-[20px] bg-blue-700 px-3 py-1 text-xs font-black tracking-[0.04em] text-white">
            {referalsData.count}
          </div>
        </div>
      </div>
      <motion.div className="relative mb-4 flex items-center justify-between rounded-2xl bg-blue-700 px-4 py-3 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]">
        <div className="flex flex-col gap-2">
          <span className="text-x font-medium text-gray-550">
            {t(NS.PAGES.FRIENDS.CAN_COLLECT)}
          </span>
          <div className="grid grid-cols-[20px_1fr] items-center gap-2">
            <StarSVG className="size-5" />
            <div className="flex items-center gap-2">
              <span className="text-stroke-1 font-extrabold text-white text-shadow-sm">
                {referalsData.reward}
              </span>
            </div>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={classNames(
            "group h-10 cursor-pointer overflow-hidden rounded-xl border border-black bg-[#0655a4] pb-[3px]",
          )}
          onClick={() => {
            handleSelectionChanged();
          }}
        >
          <div
            className={classNames(
              "shadow-inner-btn flex h-full w-full items-center justify-center rounded-[8px] bg-[#0075ff] p-[3px] pb-1",
            )}
          >
            <div
              className={classNames(
                "shadow-a text-stroke-1 flex h-full w-full items-center rounded-[8px] px-5 text-sm font-black leading-none text-shadow-sm",
                "justify-center bg-white/20",
              )}
            >
              Получить
            </div>
          </div>
        </motion.button>
      </motion.div>
      <div className="flex flex-col gap-4">
        {referalsData?.friends
          ? referalsData.friends.map((friend, index) => (
              <motion.div
                key={index}
                className="relative flex items-center justify-between rounded-2xl bg-blue-700 px-4 py-3 shadow-[inset_1px_1px_0_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_0_rgba(255,255,255,0.1)]"
              >
                <div className="grid grid-cols-[32px_1fr] gap-2">
                  <div className="relative size-8 items-center justify-center overflow-hidden rounded-full bg-white/10">
                    {friend.photo_url ? (
                      <Image src={friend.photo_url} alt={friend.name} fill />
                    ) : (
                      <span className="text-stroke-1 text-xs font-extrabold uppercase text-white text-shadow-sm">
                        {friend.name[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <span className="text-stroke-1 text-xs font-black tracking-wide text-white text-shadow-sm">
                      {friend.name}
                    </span>
                    <span className="text-x font-medium text-gray-550">
                      Прибыль в час: +{friend.reward_per_hour}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-[20px_1fr] items-center gap-2 rounded-full bg-white/10 px-2 py-1">
                  <StarSVG className="size-5" />
                  <span className="text-stroke-1 text-xs font-extrabold text-white text-shadow-sm">
                    +{friend.reward}
                  </span>
                </div>
              </motion.div>
            ))
          : null}
      </div>
    </motion.div>
  );
};
