import React from "react";

import classNames from "classnames";

import { HeroType } from "@/components/pages/heroes/types";
import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";

import { Coin, CoinType } from "./components/coin/Coin";
import { Indicator } from "./components/indicator/Indicator";
import { Ribbon } from "./components/ribbon/Ribbon";

export const HeroStats = () => {
  return (
    <div
      className={classNames(
        "absolute right-4 w-1/2 rounded-2xl border border-[#EFC609]",
        {
          "inset-y-4": true,
          "inset-y-7": false, // todo: when no "Перейти в магазин"
        },
      )}
    >
      <div className="absolute inset-0 flex flex-col gap-y-4 rounded-2xl bg-[rgba(0,0,0,0.6)] p-4 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-y-2">
          <div className="absolute inset-x-2 bottom-[72%] top-1.5 rounded-t-2xl bg-white opacity-5" />
          <div className="text-xl font-black leading-none tracking-wide text-white text-shadow">
            Месси
          </div>
          <Ribbon heroType={HeroType.REGULAR}>Обычный</Ribbon>
          <div className="flex w-full flex-col gap-y-3">
            <div className="flex w-full items-center gap-x-2">
              <Coin type={CoinType.ENERGY} />
              <Indicator label="Энергия" caption="312/ч" progress={10} />
            </div>
            <div className="flex w-full items-center gap-x-2">
              <Coin type={CoinType.HOUR_INCOME} />
              <Indicator label="Доход/час" caption="500к/ч" progress={55} />
            </div>
            <div className="flex w-full items-center gap-x-2">
              <Coin type={CoinType.TAP_INCOME} />
              <Indicator label="Доход/тап" caption="20/тап" progress={87} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <PrimaryButton size="small" color="blue">
            Выбрать
          </PrimaryButton>
          <div className="text-center text-sm font-extrabold leading-none text-white">
            Перейти в магазин
          </div>
        </div>
      </div>
    </div>
  );
};
