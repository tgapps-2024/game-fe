import React from "react";
import { HeaderItem } from "./components/header-item/HeaderItem";
import { useTelegram } from "@/context";
import Image from "next/image";
import { Level } from "@/components/ui";
import StarSVG from "@/public/assets/svg/star.svg";
import { useTranslations } from "next-intl";
import { NS } from "@/constants/ns";
import { TopComponent } from "./components/top-component/TopComponent";
import { BottomComponent } from "./components/bottom-component/BottomComponent";

export const AssignmentsHeader = () => {
  const { user } = useTelegram();
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);

  return (
    <div className="px-4 pt-15 grid grid-cols-3 mb-4">
      <div className="grid grid-cols-[40px_1fr] gap-x-1 justify-center items-center border-r border-solid border-white/10">
        <div className="!size-10 relative overflow-hidden rounded-full border-2 border-solid border-white object-cover">
          {user?.photo_url ? (
            <Image
              src={user?.photo_url}
              alt="avatar"
              fill
              objectFit="cover"
              className="rounded-full"
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-y-1 relative">
          <p className="text-base leading-none font-black tracking-[0.04em] text-nowrap text-white text-stroke-1 text-shadow-sm">
            {user?.first_name}
          </p>
          <div className="flex items-center relative -left-5 h-5">
            <div className="w-8.5 h-5 absolute z-10">
              <Level className="w-8.5 h-5" />
              <p className="text-xs -tracking-wide font-bold absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 text-white level-text">
                {38}
              </p>
            </div>
            <div className="w-full h-2.5 bg-blue-900 relative rounded-full overflow-hidden ml-7">
              <div
                className="absolute h-full shadow-green-shadow rounded-full bg-gradient-to-b from-[#F9E50F] via-[#F9E50F] to-[#EFC609] transition-width duration-300"
                style={{
                  width: `${45}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <HeaderItem
        topInfoComponent={
          <TopComponent
            text={t(
              `${NS.PAGES.ASSIGNMENTS.HEADER.ROOT}.${NS.PAGES.ASSIGNMENTS.HEADER.BALANCE.ROOT}.${NS.PAGES.ASSIGNMENTS.HEADER.BALANCE.TITLE}`
            )}
          />
        }
        bottomInfoComponent={<BottomComponent value={3000} />}
        imageNode={
          <StarSVG className="col-span-1 row-span-2 size-7 object-contain" />
        }
      />
      <HeaderItem
        topInfoComponent={
          <TopComponent
            text={t(
              `${NS.PAGES.ASSIGNMENTS.HEADER.ROOT}.${NS.PAGES.ASSIGNMENTS.HEADER.BALANCE.ROOT}.${NS.PAGES.ASSIGNMENTS.HEADER.BALANCE.STARS}`
            )}
          />
        }
        bottomInfoComponent={<BottomComponent value={50000} />}
        imageNode={
          <StarSVG className="col-span-1 row-span-2 size-7 object-contain" />
        }
      />
    </div>
  );
};
