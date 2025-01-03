import { createElement, FC, FunctionComponent, SVGProps } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import { formatValue } from "@/utils/lib/utils";

type ItemProps = {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  tidKey: string;
  value: number;
  postfix?: string;
};

export const ProfileBalance: FC<{ items: ItemProps[] }> = ({ items }) => (
  <div className="relative mb-6 grid h-7 w-full grid-cols-3">
    {items.map(({ icon, tidKey, value, postfix }, index) => (
      <ProfileBalanceItem
        key={index}
        icon={icon}
        tidKey={tidKey}
        value={value}
        postfix={postfix}
      />
    ))}
  </div>
);

const ProfileBalanceItem: FC<ItemProps> = ({
  icon,
  tidKey,
  value,
  postfix,
}) => {
  const t = useTranslations(NS.PAGES.SETTINGS.ROOT);

  return (
    <div
      className={classNames(
        "flex h-full flex-grow flex-row items-center justify-between px-3",
        "first:border-r first:border-solid first:border-white/10 first:pl-0",
        "last:border-l last:border-solid last:border-white/10 last:pr-0",
      )}
    >
      <div className="flex h-full w-full flex-1 flex-row items-center justify-center gap-x-[9px]">
        {createElement(icon, {
          className: "col-span-1 row-span-2 size-8 object-contain",
        })}
        <div className="flex h-full w-fit flex-col gap-y-1">
          <p className="font-inter text-x font-medium text-gray-550 text-shadow-sm">
            {t(tidKey)}
          </p>
          <p className="text-stroke-1 text-nowrap text-base font-black leading-none tracking-[0.04em] text-white text-shadow-sm">
            {formatValue(value)} {postfix && postfix}
          </p>
        </div>
      </div>
    </div>
  );
};
