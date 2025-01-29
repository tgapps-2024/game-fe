import React, { useState } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { CheckedPentagon } from "@/components/ui/svgr-icons/CheckedPentagon";
import { Pentagon } from "@/components/ui/svgr-icons/Pentagon";
import { Toast } from "@/components/ui/toast";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useStarsPayment } from "@/services/payments/queries";
import { InvoiceStatus } from '@/types/telegram';

export const EnhanceButton = () => {
  const { webApp } = useTelegram();
  const [isChecked, setIsChecked] = useState(false);
  const t = useTranslations(NS.PAGES.BATTLE_PASS.ROOT);
  const { mutate } = useStarsPayment(
    1,
    (response) => {
      if (webApp) {
        try {
          webApp.openInvoice(response.url, (status) => {
            switch (status) {
              case InvoiceStatus.PAID:
                toast(<Toast type="done" text={status} />, {
                  duration: 5000,
                });
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
        } catch (e) {
          alert(`${(e as Error).message}, URL=${response.url}`);
        }

        setIsChecked(true);
      }
    },
    (error) => {
      toast(<Toast type="destructive" text={error.message} />, {
        duration: 5000,
      });
      setIsChecked(true);
    },
  );

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="relative flex items-center justify-center"
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      onClick={() => mutate()}
    >
      {isChecked ? (
        <CheckedPentagon className="shrink-0" />
      ) : (
        <Pentagon className="shrink-0" />
      )}
      <span
        className={classNames(
          "text-stroke-1 absolute inset-0 z-10 text-center font-black text-white text-shadow-sm",
          {
            "leading-10": !isChecked,
            "pl-3 text-xs leading-[38px]": isChecked,
          },
        )}
      >
        {t(
          `${NS.PAGES.BATTLE_PASS.BUTTONS.ROOT}.${NS.PAGES.BATTLE_PASS.BUTTONS.IMPROVE}`,
        )}
      </span>
    </motion.div>
  );
};
