import React, { createElement, FunctionComponent, useState } from "react";

import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import classNames from "classnames";
import { toast } from "sonner";

import { Timeline } from "@/components/common";
import {
  ASSIGNMENTS_ICONS,
  REWARD_ICONS,
} from "@/components/pages/assignments/components/assignments-list/constants";
import { DrawerTitle } from "@/components/ui/drawer";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useStarsPayment } from "@/services/payments/queries";
import { ITask } from "@/services/tasks/types";
import { InvoiceStatus } from "@/types/telegram";
import { formatNumber } from "@/utils/number";

import { CHECK_TASKS_MODAL_TID } from "../../constants";

type Props = Pick<ITask, "type" | "reward" | "title"> & {
  isClicked: boolean;
  onClick: (hasVerify?: boolean) => void;
  onCheck: () => void;
};

export const BuyStars: FunctionComponent<Props> = ({
  type,
  reward,
  title,
  onCheck,
}) => {
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);
  const { webApp } = useTelegram();
  const [isChecked, setIsChecked] = useState(false);
  const { locale } = useRouter();
  const { mutate, isPending } = useStarsPayment(
    1,
    (response) => {
      if (webApp) {
        webApp.openInvoice(response.url, (status) => {
          switch (status) {
            case InvoiceStatus.PAID:
              toast(<Toast type="done" text={status} />, {
                duration: 5000,
              });
              setTimeout(() => {
                setIsChecked(true);
              }, 3000);
              break;
            case InvoiceStatus.FAILED:
              toast(<Toast type="destructive" text={status} />, {
                duration: 5000,
              });
              break;
            default:
              toast(<Toast type="warning" text={status} />, {
                duration: 5000,
              });
              break;
          }
        });
      }
    },
    (error) => {
      toast(<Toast type="destructive" text={error.message} />, {
        duration: 5000,
      });
      setIsChecked(true);
    },
  );

  const handleCheck = () => {
    if (isChecked) {
      onCheck();
    }
  };

  return (
    <>
      <DrawerTitle className="text-stroke-1 mb-3 flex flex-col items-center gap-6 text-center text-[28px] font-black uppercase leading-none tracking-[0.04em] !text-white text-shadow">
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
                  <PrimaryButton size="small" onClick={() => mutate()}>
                    {t(CHECK_TASKS_MODAL_TID[type])}
                  </PrimaryButton>
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
        <PrimaryButton
          className="uppercase"
          disabled={!isChecked}
          onClick={handleCheck}
          isLoading={isPending}
          size="large"
        >
          {t(
            `${NS.PAGES.ASSIGNMENTS.MODALS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.ROOT}.${NS.PAGES.ASSIGNMENTS.MODALS.CHECK_ASSIGNMENTS.BUTTON}`,
          )}
        </PrimaryButton>
      </div>
    </>
  );
};
