import React from "react";

import { PageWrapper } from "@/components/common";

import { Machine } from "./components/machine/Machine";

export const SlotMachine = () => {
  return (
    <PageWrapper
      className="flex flex-col bg-[url('/assets/png/slot-machine/bg.webp')] bg-cover bg-center pt-20"
      disableSafeAreaInset
    >
      <div className="flex min-h-0 grow flex-col">
        <div className="mt-auto aspect-[0.51] max-h-full w-full">
          <Machine />
        </div>
      </div>
    </PageWrapper>
  );
};
