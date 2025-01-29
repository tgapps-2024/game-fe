import React from "react";

import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import { HeaderItem } from "@/components/common/profile-header/components/header-item/HeaderItem";
import { TopComponent } from "@/components/common/profile-header/components/top-component/TopComponent";
import { Level } from "@/components/ui";
import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import FrindsSvg from "@/public/assets/svg/friends-coin.svg";
import StarSVG from "@/public/assets/svg/star.svg";

export const Header = () => {
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);
  const { pathname } = useRouter();
  const isFriendsPage = pathname === ROUTES.FRIENDS;

  return (
    <div className="relative grid h-10 grid-cols-3 px-4">
      <div className="grid grid-cols-[40px_1fr] items-center justify-center gap-x-1 border-r border-solid border-white/10">
        <div className="relative !size-10 animate-pulse overflow-hidden rounded-full border-2 border-solid border-white bg-white/90 object-cover" />
        <div className="relative flex flex-col gap-y-1">
          <div className="h-4 w-17 animate-pulse rounded-[20px] bg-blue-700" />
          <div className="relative -left-5 flex h-5 items-center">
            <div className="absolute z-10 h-5 w-8.5">
              <Level className="h-5 w-8.5" />
            </div>
            <div className="relative ml-7 h-2.5 w-full overflow-hidden rounded-full bg-blue-900">
              <div
                className="transition-width absolute h-full rounded-full bg-gradient-to-b from-[#F9E50F] via-[#F9E50F] to-[#EFC609] shadow-green-shadow duration-300"
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
              `${NS.PAGES.ASSIGNMENTS.HEADER.ROOT}.${NS.PAGES.ASSIGNMENTS.HEADER.BALANCE.ROOT}.${NS.PAGES.ASSIGNMENTS.HEADER.BALANCE.TITLE}`,
            )}
          />
        }
        bottomInfoComponent={
          <div className="h-4 w-17 animate-pulse rounded-[20px] bg-blue-700" />
        }
        imageNode={
          <StarSVG className="col-span-1 row-span-2 size-8 object-contain" />
        }
      />
      {isFriendsPage ? (
        <HeaderItem
          topInfoComponent={
            <TopComponent
              text={t(
                `${NS.PAGES.ASSIGNMENTS.HEADER.ROOT}.${NS.PAGES.ASSIGNMENTS.HEADER.BALANCE.ROOT}.${NS.PAGES.ASSIGNMENTS.HEADER.BALANCE.FRIENDS}`,
              )}
            />
          }
          bottomInfoComponent={
            <div className="h-4 w-17 animate-pulse rounded-[20px] bg-blue-700" />
          }
          imageNode={
            <FrindsSvg className="col-span-1 row-span-2 size-8 object-contain" />
          }
        />
      ) : (
        <HeaderItem
          topInfoComponent={
            <TopComponent
              text={t(
                `${NS.PAGES.ASSIGNMENTS.HEADER.ROOT}.${NS.PAGES.ASSIGNMENTS.HEADER.BALANCE.ROOT}.${NS.PAGES.ASSIGNMENTS.HEADER.BALANCE.STARS}`,
              )}
            />
          }
          bottomInfoComponent={
            <div className="h-4 w-17 animate-pulse rounded-[20px] bg-blue-700" />
          }
          imageNode={
            <StarSVG className="col-span-1 row-span-2 size-8 object-contain" />
          }
        />
      )}
    </div>
  );
};
