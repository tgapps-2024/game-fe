import React, { createElement, FunctionComponent, useState } from "react";

import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import classNames from "classnames";

import { Timeline } from "@/components/common";
import {
  DrawerClose,
  DrawerContent,
  DrawerPortal,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import CloseIcon from "@/public/assets/svg/close.svg";
import ExternalSVG from "@/public/assets/svg/external.svg";
import { ITask, TaskType } from "@/services/tasks/types";
import { formatNumber } from "@/utils/number";

import { ASSIGNMENTS_ICONS, REWARD_ICONS } from "../../../../constants";

import { CHECK_TASKS_MODAL_TID, VERIFIED_TYPES } from "./constants";

type Props = Pick<ITask, "type" | "title" | "reward">;

export const CheckTaskModal: FunctionComponent<Props> = ({
  type,
  title,
  reward,
}) => {
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);
  const { locale } = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const { handleSelectionChanged } = useHapticFeedback();
  const { webApp } = useTelegram();

  const handleClicked = (hasVerify: boolean = false) => {
    handleSelectionChanged();

    if (hasVerify) {
      setIsClicked(true);
    }

    switch (type) {
      case TaskType.SOCIAL_SUB:
        webApp?.openTelegramLink(process.env.NEXT_PUBLIC_CHANNEL_SOURCE || "");
        break;
      case TaskType.TON_PROMOTE:
        // Call the method specific to TON_PROMOTE
        break;
      case TaskType.STORIES_REPLY:
        webApp?.shareToStory(process.env.NEXT_PUBLIC_BOT_USERNAME || "");
        break;
      case TaskType.ADD_TO_HOME:
        webApp?.addToHomeScreen();
        break;
      case TaskType.EMOJI_SET:
        webApp?.setEmojiStatus(process.env.NEXT_PUBLIC_CUSTOM_EMOJI_ID || "");
        break;
      case TaskType.DONATE:
        // Call the method specific to DONATE
        break;
      case TaskType.WALLET_CONNECT:
        // Call the method specific to WALLET_CONNECT
        break;
      case TaskType.BOOST_CHANNEL:
        // Call the method specific to BOOST_CHANNEL
        break;
      default:
        // Handle any other cases
        break;
    }
  };

  return (
    <DrawerPortal>
      <DrawerContent className="flex w-full flex-col items-center overflow-hidden rounded-t-3xl border-white/10 bg-blue-700 px-4 pb-8 pt-9 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
        <DrawerClose className="absolute right-4 top-4 z-10">
          <CloseIcon />
        </DrawerClose>
        <DrawerTitle className="text-stroke-1 mb-3 flex flex-col items-center gap-6 text-center text-[28px] font-black uppercase leading-none tracking-[0.04em] text-white text-shadow">
          {createElement(ASSIGNMENTS_ICONS[type], {
            className: "size-23 rounded-full",
          })}
          {locale === "en" ? title.en : title.ru}
        </DrawerTitle>
        <div
          className={classNames(
            "mx-auto mb-3 flex w-fit items-center gap-2 rounded-full bg-blue-800/50 px-3 py-1",
          )}
        >
          {reward.map(({ type, value }) => (
            <div
              key={type}
              className="flex items-center gap-1 text-base font-extrabold leading-none text-yellow-500"
            >
              {React.createElement(REWARD_ICONS[type], {
                className: "size-6",
              })}
              + {formatNumber(value)}
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
                    <p className="text-sm font-medium leading-none text-gray-550">
                      {t(
                        `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.DO_ASSIGNMENT}`,
                      )}
                    </p>
                    <button
                      // onClick={(event) => {
                      //   event.preventDefault();
                      //   handleClicked();
                      //   window.open("https://t.me/noname_channel", "_blank");
                      // }}
                      onClick={() =>
                        handleClicked(VERIFIED_TYPES.includes(type))
                      }
                      className="text-stroke-1 flex items-baseline gap-1 font-extrabold uppercase leading-none tracking-wide text-white text-shadow-sm"
                    >
                      {t(CHECK_TASKS_MODAL_TID[type])}
                      <ExternalSVG className="size-4" />
                    </button>
                  </div>
                ),
              },
              {
                id: 2,
                description: (
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium leading-none text-gray-550">
                      {t(
                        `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.CHECK_ASSIGNMENTS}`,
                      )}
                    </p>
                  </div>
                ),
              },
            ]}
          />
          <PrimaryButton className="uppercase" disabled={!isClicked}>
            {t(
              `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.BUTTON}`,
            )}
          </PrimaryButton>
        </div>
      </DrawerContent>
    </DrawerPortal>
  );
};
