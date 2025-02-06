import React, { FunctionComponent, useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";

type Props = {
  isLoading: boolean;
  onClick: () => void;
  disabled: boolean;
};

export const GetAllButton: FunctionComponent<Props> = ({
  isLoading,
  onClick,
  disabled,
}) => {
  const t = useTranslations(NS.PAGES.REWARDS.ROOT);
  const { handleSelectionChanged } = useHapticFeedback();
  const [timeLeft, setTimeLeft] = useState<{ h: string; m: string; s: string }>(
    {
      h: "00",
      m: "00",
      s: "00",
    },
  );

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date(Date.now() + new Date().getTimezoneOffset() * 60000); // Текущее время в GMT

      const midnight = new Date(now);
      midnight.setUTCHours(0, 0, 0, 0);
      midnight.setUTCDate(midnight.getUTCDate() + 1);

      const remaining = midnight.getTime() - now.getTime();

      const hours = String(
        Math.floor(remaining / (1000 * 60 * 60) - 3),
      ).padStart(2, "0");
      const minutes = String(
        Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
      ).padStart(2, "0");
      const seconds = String(
        Math.floor((remaining % (1000 * 60)) / 1000),
      ).padStart(2, "0");

      setTimeLeft({
        h: hours,
        m: minutes,
        s: seconds,
      });
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const handleCollectReward = () => {
    onClick();
    handleSelectionChanged();
  };

  return (
    <div
      className={classNames(
        "fixed bottom-0 left-0 z-10 w-full bg-gradient-to-b from-[#192632]/0 via-[#192632]/100 to-[#192632]/100 px-4 pb-8 pt-18",
      )}
    >
      <PrimaryButton
        color="secondary"
        className={classNames("uppercase", { "!bg-[#1B3044]": disabled })}
        innerClassname={classNames({ "!bg-[#1B3044]": disabled })}
        isLoading={isLoading}
        onClick={handleCollectReward}
        disabled={disabled}
      >
        {disabled && timeLeft ? (
          <span className="text-stroke-1 text-lg font-black lowercase leading-none text-white text-shadow-sm">
            {timeLeft.h}ч <span className="text-gray-550">:</span> {timeLeft.m}м{" "}
            <span className="text-gray-550">:</span> {timeLeft.s}с
          </span>
        ) : (
          t(NS.PAGES.REWARDS.GET_REWARDS)
        )}
      </PrimaryButton>
    </div>
  );
};
