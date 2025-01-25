import React, { FunctionComponent } from "react";

import classNames from "classnames";

type Props = {
  bgScaleDelta: number;
};

export const BattlePassHeader: FunctionComponent<Props> = ({ bgScaleDelta }) => {
  return (
    <div className="relative w-full">
      <div
        className="fixed inset-0 bg-[url('/assets/png/battle-pass/bg.webp')] bg-no-repeat bg-center-top"
        style={{
          backgroundSize: `calc(100% + ${bgScaleDelta}px)`,
        }}
      />
      <div className="absolute bottom-[5px] w-full">
        <div className="mx-auto w-fit rounded-t-2xl bg-[#FFCE08] p-1">
          <div
            className={classNames(
              "w-fit rounded-b-md rounded-t-xl bg-orange-550 px-[30px] py-2 shadow-battle-pass-combined",
              "text-stroke-half text-2xl font-black uppercase tracking-wide text-white text-shadow",
            )}
          >
            Battle Pass
          </div>
        </div>
        <div className="absolute -bottom-[5px] w-full">
          <div className="h-1.5 w-full bg-[#FFCE08] shadow-inner-light" />
          <div className="relative h-0.5 w-full bg-[#E88C0E]" />
        </div>
      </div>
    </div>
  );
};
