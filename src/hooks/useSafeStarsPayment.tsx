import React from "react";

import { toast } from "sonner";

import { Toast } from "@/components/ui/toast";
import { useTelegram } from "@/context";
import { useStarsPayment } from "@/services/payments/queries";
import {
  invalidateProfileQuery,
  useGetProfile,
} from "@/services/profile/queries";
import { InvoiceStatus } from "@/types/telegram";
import { useQueryClient } from "@tanstack/react-query";

type UseSafeStarsPaymentConfig = {
  buy: (starsAmount: number) => void;
  isStarsPaymentLoading: boolean;
};

export const useSafeStarsPayment = (
  buyItemFn: () => void,
  onStarsPaymentSuccess?: () => void,
  onStarsPaymentError?: () => void,
): UseSafeStarsPaymentConfig => {
  const queryClient = useQueryClient();
  const { webApp } = useTelegram();
  const { data: profile } = useGetProfile();
  const { mutate: buyStars, isPending: isStarsPaymentLoading } =
    useStarsPayment(
      (response) => {
        if (webApp) {
          try {
            webApp.openInvoice(response.url, (status) => {
              switch (status) {
                case InvoiceStatus.PAID: {
                  toast(<Toast type="done" text={status} />);

                  if (onStarsPaymentSuccess) {
                    onStarsPaymentSuccess();
                  }

                  break;
                }

                case InvoiceStatus.FAILED:
                  toast(<Toast type="destructive" text={status} />);
                  break;
                default:
                  toast(<Toast type="warning" text={status} />);
                  break;
              }
            });
          } catch (e) {
            const message = `${(e as Error).message}`;

            toast(<Toast type="warning" text={message} />);
          }
        }
      },
      (error) => {
        toast(<Toast type="destructive" text={error.message} />);

        if (onStarsPaymentError) {
          onStarsPaymentError();
        }
      },
    );

  return {
    buy: (starsAmount: number) => {
      if ((profile?.stars ?? 0) >= starsAmount) {
        buyItemFn();
      } else {
        buyStars(starsAmount, {
          onSuccess: () => {
            invalidateProfileQuery(queryClient);
          },
        });
      }
    },
    isStarsPaymentLoading,
  };
};
