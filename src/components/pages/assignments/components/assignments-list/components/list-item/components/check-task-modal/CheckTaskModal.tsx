import React, { FunctionComponent, useState } from "react";

import { useTranslations } from "next-intl";

import { toast } from "sonner";

import {
  DrawerClose,
  DrawerContent,
  DrawerPortal,
} from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import CloseIcon from "@/public/assets/svg/close.svg";
import { ITask, TaskStatus, TaskType } from "@/services/tasks/types";
import { useTonConnectUI } from "@tonconnect/ui-react";

import { DoubleCheck } from "./components/double-check/DoubleCheck";
import { COMPONENTS_MAP } from "./constants";

type Props = Pick<ITask, "type" | "title" | "reward" | "id" | "status"> & {
  onClose: () => void;
};

export const CheckTaskModal: FunctionComponent<Props> = ({
  type,
  title,
  reward,
  status,
  id,
  onClose,
}) => {
  const t = useTranslations(NS.COMMON.ROOT);
  const [isClicked, setIsClicked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [tonConnectUI] = useTonConnectUI();

  const { handleSelectionChanged } = useHapticFeedback();
  const { webApp } = useTelegram();

  const handleClick = async () => {
    handleSelectionChanged();

    if (status === TaskStatus.COMPLETED) {
      return;
    }

    switch (type) {
      case TaskType.SOCIAL_SUB:
        try {
          webApp?.openTelegramLink(
            `https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}`,
          );
          setIsClicked(true);
        } catch {
          toast(
            <Toast
              type="destructive"
              text={t(
                `${NS.COMMON.TOAST.ROOT}.${NS.COMMON.TOAST.UPDATE_TELEGRAM}`,
              )}
            />,
          );
        }
        break;
      case TaskType.TON_PROMOTE:
        try {
          await tonConnectUI?.sendTransaction({
            messages: [
              {
                address: "UQCNxZR07lur7Qebs6qGXYkHc3Rw-CKNm9npqpH8HiAPr5YW",
                amount: "1",
              },
            ],
            validUntil: Date.now() + 1000000,
          });

          toast(
            <Toast
              type="done"
              text={t(`${NS.COMMON.TOAST.ROOT}.${NS.COMMON.TOAST.DONE}`)}
            />,
            {
              duration: 5000,
            },
          );
          onClose();
        } catch {
          toast(
            <Toast
              type="destructive"
              text={t(`${NS.COMMON.TOAST.ROOT}.${NS.COMMON.TOAST.DESTRUCTIVE}`)}
            />,
            {
              duration: 5000,
            },
          );
        } finally {
          setIsClicked(true);
        }

        break;
      case TaskType.STORIES_REPLY:
        try {
          webApp?.shareToStory(process.env.NEXT_PUBLIC_BOT_USERNAME || "");
          setIsClicked(true);
        } catch {
          toast(
            <Toast
              type="destructive"
              text={t(
                `${NS.COMMON.TOAST.ROOT}.${NS.COMMON.TOAST.UPDATE_TELEGRAM}`,
              )}
            />,
          );
        }
        break;
      case TaskType.ADD_TO_HOME:
        try {
          webApp?.addToHomeScreen();
          setIsClicked(true);
        } catch {
          toast(
            <Toast
              type="destructive"
              text={t(
                `${NS.COMMON.TOAST.ROOT}.${NS.COMMON.TOAST.UPDATE_TELEGRAM}`,
              )}
            />,
          );
        }
        break;
      case TaskType.EMOJI_SET:
        try {
          webApp?.setEmojiStatus(process.env.NEXT_PUBLIC_CUSTOM_EMOJI_ID || "");
          setIsClicked(true);
        } catch {
          toast(
            <Toast
              type="destructive"
              text={t(
                `${NS.COMMON.TOAST.ROOT}.${NS.COMMON.TOAST.UPDATE_TELEGRAM}`,
              )}
            />,
          );
        }
        break;
      case TaskType.DONATE:
        // setIsClicked(true);
        // Call the method specific to DONATE
        break;
      case TaskType.WALLET_CONNECT:
        // setIsClicked(true);
        // Call the method specific to WALLET_CONNECT
        break;
      case TaskType.BOOST_CHANNEL:
        setIsClicked(true);
        // Call the method specific to BOOST_CHANNEL
        break;
      default:
        // setIsClicked(true);
        // Handle any other cases
        break;
    }
  };

  const handleCheck = () => {
    handleSelectionChanged();
    setIsChecked(true);
  };

  return (
    <DrawerPortal>
      <DrawerContent className="flex w-full flex-col items-center overflow-hidden rounded-t-3xl border-white/10 bg-blue-700 px-4 pb-8 pt-9 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
        <DrawerClose className="absolute right-4 top-4 z-10">
          <CloseIcon onClick={handleSelectionChanged} />
        </DrawerClose>
        {isChecked ? (
          <DoubleCheck id={id} onClose={onClose} onCheck={handleCheck} />
        ) : (
          React.createElement(COMPONENTS_MAP[type], {
            type,
            reward,
            title,
            isClicked,
            onClick: handleClick,
            onCheck: handleCheck,
          })
        )}
      </DrawerContent>
    </DrawerPortal>
  );
};
