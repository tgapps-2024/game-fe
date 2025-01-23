import React from "react";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { PrimaryButton } from "@/components/ui/primary-button/PrimaryButton";
import { NS } from "@/constants/ns";

export const BottomMenu = () => {
  const t = useTranslations(NS.COMMON.ROOT);
  const { back } = useRouter();

  return (
    <div
      className="shadow-bp-bottom-menu fixed bottom-0 flex h-26 w-full items-center justify-center bg-bp-bottom-menu-pattern z-30"
      onClick={back}
    >
      <div>
        <PrimaryButton>{t(NS.COMMON.OK)}</PrimaryButton>
      </div>
    </div>
  );
};
