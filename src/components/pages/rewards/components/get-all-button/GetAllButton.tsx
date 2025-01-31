import React from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";

export const GetAllButton = () => {
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);
  const { handleSelectionChanged } = useHapticFeedback();

  return (
    <div
      className={classNames(
        "fixed bottom-0 left-0 z-10 w-full bg-gradient-to-b from-[#192632]/0 via-[#192632]/100 to-[#192632]/100 px-4 pb-8 pt-18",
      )}
    >
      <PrimaryButton
        color="secondary"
        className="uppercase"
        onClick={() => handleSelectionChanged()}
      >
        {t(NS.PAGES.REWARDS.GET_REWARDS)}
      </PrimaryButton>
    </div>
  );
};
