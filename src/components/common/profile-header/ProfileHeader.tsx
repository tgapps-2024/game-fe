import { FunctionComponent } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import { Level } from "@/components/ui";
import { NS } from "@/constants/ns";
import { ROUTES } from "@/constants/routes";
import { useTelegram } from "@/context";
import FrindsSvg from "@/public/assets/svg/friends-coin.svg";
import StarSVG from "@/public/assets/svg/star.svg";
import { IProfile } from "@/services/profile/types";

import { BottomComponent } from "./components/bottom-component/BottomComponent";
import { HeaderItem } from "./components/header-item/HeaderItem";
import { TopComponent } from "./components/top-component/TopComponent";

type Props = {
  profileData: IProfile;
};

export const ProfileHeader: FunctionComponent<Props> = ({
  profileData: { level, coins, stars, friends },
}) => {
  const { user } = useTelegram();
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);
  const { pathname } = useRouter();
  const isFriendsPage = pathname === ROUTES.FRIENDS;

  return (
    <div className="relative grid h-10 grid-cols-3 px-4">
      <Link
        href={ROUTES.SETTINGS}
        className="grid grid-cols-[40px_1fr] items-center justify-center gap-x-1 border-r border-solid border-white/10"
      >
        <div className="relative !size-10 overflow-hidden rounded-full border-2 border-solid border-white object-cover">
          {user?.photo_url ? (
            <Image
              src={user?.photo_url}
              alt="avatar"
              fill
              className="rounded-full"
            />
          ) : null}
        </div>
        <div className="relative flex flex-col gap-y-1">
          <p className="text-stroke-1 text-nowrap text-base font-black leading-none tracking-[0.04em] text-white text-shadow-sm">
            {user?.first_name}
          </p>
          <div className="relative -left-5 flex h-5 items-center">
            <div className="absolute z-10 h-5 w-8.5">
              <Level className="h-5 w-8.5" />
              <p className="level-text absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-xs font-bold -tracking-wide text-white">
                {level}
              </p>
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
      </Link>
      <HeaderItem
        topInfoComponent={
          <TopComponent
            text={t(
              `${NS.PAGES.ASSIGNMENTS.HEADER.ROOT}.${NS.PAGES.ASSIGNMENTS.HEADER.BALANCE.ROOT}.${NS.PAGES.ASSIGNMENTS.HEADER.BALANCE.TITLE}`,
            )}
          />
        }
        bottomInfoComponent={<BottomComponent value={coins ?? 0} />}
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
          bottomInfoComponent={<BottomComponent value={friends ?? 0} />}
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
          bottomInfoComponent={<BottomComponent value={stars ?? 0} />}
          imageNode={
            <StarSVG className="col-span-1 row-span-2 size-8 object-contain" />
          }
        />
      )}
    </div>
  );
};
