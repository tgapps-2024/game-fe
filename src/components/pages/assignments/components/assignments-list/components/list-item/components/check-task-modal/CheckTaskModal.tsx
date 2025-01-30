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
import { useSetCompleteTask } from "@/services/tasks/queries";
import { ITask, TaskStatus, TaskType } from "@/services/tasks/types";
import { useQueryClient } from "@tanstack/react-query";
import { useTonConnectUI } from "@tonconnect/ui-react";

import { COMPONENTS_MAP } from "./constants";

type Props = Pick<
  ITask,
  "type" | "title" | "reward" | "id" | "status" | "value"
> & {
  onClose: () => void;
};

export const CheckTaskModal: FunctionComponent<Props> = ({
  type,
  title,
  reward,
  status,
  id,
  value,
  onClose,
}) => {
  const t = useTranslations(NS.COMMON.ROOT);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const { mutate: setCompleteTask, isPending } =
    useSetCompleteTask(queryClient);

  const { handleSelectionChanged } = useHapticFeedback();
  const { webApp } = useTelegram();

  const handleClick = async () => {
    setIsLoading(true);
    handleSelectionChanged();

    if (status === TaskStatus.COMPLETED) {
      return;
    }

    switch (type) {
      case TaskType.SOCIAL_SUB:
        try {
          webApp?.openTelegramLink(value as string);
          setTimeout(() => {
            setIsInit(true);
          }, 3000);
        } catch {
          toast(
            <Toast
              type="destructive"
              text={t(
                `${NS.COMMON.TOAST.ROOT}.${NS.COMMON.TOAST.UPDATE_TELEGRAM}`,
              )}
            />,
          );
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
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
        }

        break;
      case TaskType.STORIES_REPLY:
        try {
          webApp?.shareToStory(value as string);
          setTimeout(() => {
            setIsInit(true);
          }, 3000);
        } catch {
          toast(
            <Toast
              type="destructive"
              text={t(
                `${NS.COMMON.TOAST.ROOT}.${NS.COMMON.TOAST.UPDATE_TELEGRAM}`,
              )}
            />,
          );
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        }
        break;
      case TaskType.ADD_TO_HOME:
        try {
          webApp?.addToHomeScreen();
          setTimeout(() => {
            setIsInit(true);
          }, 3000);
        } catch {
          toast(
            <Toast
              type="destructive"
              text={t(
                `${NS.COMMON.TOAST.ROOT}.${NS.COMMON.TOAST.UPDATE_TELEGRAM}`,
              )}
            />,
          );
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        }
        break;
      case TaskType.EMOJI_SET:
        try {
          webApp?.setEmojiStatus(value as string);
          setTimeout(() => {
            setIsInit(true);
          }, 3000);
        } catch {
          toast(
            <Toast
              type="destructive"
              text={t(
                `${NS.COMMON.TOAST.ROOT}.${NS.COMMON.TOAST.UPDATE_TELEGRAM}`,
              )}
            />,
          );
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
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
    setIsChecked(!isChecked);
  };

  return (
    <DrawerPortal>
      <DrawerContent className="flex w-full flex-col items-center overflow-hidden rounded-t-3xl border-white/10 bg-blue-700 px-4 pb-8 pt-9 font-rubik shadow-[0_-8px_12px_0_rgba(5,22,37,0.6)]">
        <DrawerClose className="absolute right-4 top-4 z-10">
          <CloseIcon onClick={handleSelectionChanged} />
        </DrawerClose>
        {React.createElement(COMPONENTS_MAP[type], {
          id,
          type,
          reward,
          title,
          value,
          isPending,
          isLoading,
          isChecked,
          isInit,
          onClick: handleClick,
          onCheck: handleCheck,
          onSubmit: setCompleteTask,
          onClose,
        })}
      </DrawerContent>
    </DrawerPortal>
  );
};
