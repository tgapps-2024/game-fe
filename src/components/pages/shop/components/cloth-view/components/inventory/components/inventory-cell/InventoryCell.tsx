import React, { FunctionComponent } from "react";

import Image from "next/image";

import InventoryPlus from "@/public/assets/png/shop/inventory-plus.webp";

type Props = {
  label: string | null;
};

export const InventoryCell: FunctionComponent<Props> = ({ label }) => (
  <div className="flex basis-1/5 flex-col gap-y-1">
    <div className="aspect-square overflow-hidden rounded-lg border border-[#552005] bg-[#883308] pb-px">
      <div className="bg-shop-inventory-bg-pattern h-full rounded-b-lg p-1 shadow-[inset_0_-1px_0.5px_rgba(255,255,255,0.3)]">
        <div className="relative h-full rounded-md bg-[#883308] shadow-card-inner-shadow">
          <Image
            className="absolute inset-0 m-auto w-[36%]"
            src={InventoryPlus}
            alt=""
          />
        </div>
      </div>
    </div>
    <div className="text-stroke-1 text-center text-xs font-bold tracking-wide text-white text-shadow-sm">
      {label}
    </div>
  </div>
);
