import React from "react";

import { useTranslations } from "next-intl";

import { motion } from "framer-motion";

import { ProfileHeader, Spinner } from "@/components/common";
import { Drawer } from "@/components/ui/drawer";
import { NS } from "@/constants/ns";
import { useTelegram } from "@/context";
import { useGetProfile, useGetReferals } from "@/services/profile/queries";
import { IProfile, IReferals } from "@/services/profile/types";

import { FriendsList } from "./components/friends-list/FriendsList";
import { InviteBoard } from "./components/invite-board/InviteBoard";
import { InviteButton } from "./components/invite-button/InviteButton";
import { InviteModal } from "./components/invite-modal/InviteModal";

export const Friends = () => {
  const t = useTranslations(NS.PAGES.FRIENDS.ROOT);
  const { webApp } = useTelegram();
  const { data, isPending } = useGetProfile();
  const { data: referalData, isPending: isPendingReferalData } =
    useGetReferals();

  if (
    !webApp ||
    !webApp.initDataUnsafe?.user ||
    isPending ||
    isPendingReferalData
  ) {
    return (
      <div className="flex h-screen max-h-screen w-full items-center justify-center overflow-y-auto overscroll-contain bg-blue-800 py-10">
        <Spinner className="mx-auto stroke-white" />
      </div>
    );
  }

  return (
    <Drawer>
      <div className="h-screen w-full overflow-y-auto overscroll-contain scroll-smooth bg-blue-800">
        <div className="relative box-border flex min-h-full flex-col pt-74">
          <div className="bg-center-top pointer-events-none fixed inset-0 z-[1] bg-[url('/assets/png/friends/bg.webp')] bg-[length:100%] bg-no-repeat" />
          <div className="relative z-10 w-full">
            <div className="absolute bottom-20 w-full">
              <ProfileHeader profileData={data || ({} as IProfile)} />
              <p className="text-stroke-1 mx-4 mt-6 w-48 text-justify font-rubik text-xl font-black uppercase leading-none text-white text-shadow-sm">
                {t(`${NS.PAGES.FRIENDS.PROPOSAL}`)}
              </p>
            </div>
          </div>
          <div className="relative z-10 min-h-full w-full flex-1 bg-blue-800">
            <motion.div
              className="relative h-[calc(100%+16px)] w-full rounded-t-2xl"
              initial={{ y: "0%" }}
              animate={{ y: "-16px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <InviteBoard referalsData={referalData || ({} as IReferals)} />
              <FriendsList referalsData={referalData || ({} as IReferals)} />
            </motion.div>
          </div>
          <InviteButton />
        </div>
        <InviteModal />
      </div>
    </Drawer>
  );
};
