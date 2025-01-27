import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { toast } from "sonner";

import {
  DrawerClose,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import ErrorImage from "@/public/assets/png/assignments/error404.webp";
import DividerSVG from "@/public/assets/svg/divider.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { useSetCompleteTask } from "@/services/tasks/queries";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  id: string;
  onCheck: () => void;
  onClose: () => void;
};

export const DoubleCheck: FunctionComponent<Props> = ({
  id,
  onCheck,
  onClose,
}) => {
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);
  const queryClient = useQueryClient();

  const { mutate: setCompleteTask, isPending } =
    useSetCompleteTask(queryClient);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const handleTaskComplete = () => {
    setCompleteTask(id, {
      onSuccess: () => {
        onClose();
        toast(<Toast type="done" text="Задание выполнено 🚀" />);
      },
      onError: () => {
        toast(<Toast type="destructive" text="Что-то пошло не так" />);
      },
    });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center"
    >
      <div className="relative mb-6 aspect-video w-[85%]">
        <Image src={ErrorImage} alt="error" fill />
      </div>

      <DrawerTitle className="text-stroke-1 mb-3 text-center text-2xl font-black uppercase tracking-normal !text-white text-shadow-sm">
        {t(
          `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.TITLE}`,
        )}
      </DrawerTitle>
      <DrawerDescription className="mb-3 text-center text-xs font-medium leading-none text-gray-550">
        {t(
          `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.DESCRIPTION}`,
        )}
      </DrawerDescription>
      <div className="mb-8 grid w-full grid-cols-[1fr_32px_1fr] items-center rounded-2xl bg-white/5 p-4 text-white">
        <div className="flex flex-col items-center justify-center gap-2">
          <StarSVG className="size-7" />
          <span className="text-stroke-half text-center font-extrabold uppercase leading-none text-yellow-500 text-shadow">
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
          <span className="text-stroke-half text-center font-extrabold uppercase leading-none text-red-500 text-shadow">
            +1.000.000
          </span>
          <span className="text-xs font-medium leading-none tracking-wide text-gray-550">
            {t(
              `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.PENALTY}`,
            )}
          </span>
        </div>
      </div>
      <DrawerClose asChild className="w-full">
        <PrimaryButton
          isLoading={isPending}
          size="large"
          className="uppercase"
          onClick={handleTaskComplete}
        >
          {t(
            `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.BUTTON}`,
          )}
        </PrimaryButton>
      </DrawerClose>
      <motion.button
        whileTap={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        onClick={onCheck}
        className="mt-5 text-sm font-bold uppercase leading-none tracking-wide text-white"
      >
        {t(
          `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CONFIRMATION_MODAL.DOUBLE_CHECK}`,
        )}
      </motion.button>
    </motion.div>
  );
};
