import { AxiosError } from "axios";

import { useMutation } from "@tanstack/react-query";

import { payStars } from "./fetcher";
import { StarsPaymentResponse } from "./types";

enum QueryKeys {
  STARS_PAYMENT = "STARS_PAYMENT",
}

export const useStarsPayment = (
  starsAmount: number,
  onSuccess?: (response: StarsPaymentResponse) => void,
  onError?: (error: AxiosError) => void,
) =>
  useMutation<StarsPaymentResponse, AxiosError>({
    mutationKey: [QueryKeys.STARS_PAYMENT],
    mutationFn: () => payStars(starsAmount),
    onSuccess,
    onError,
  });
