import React, { createElement, FC, FunctionComponent, SVGProps } from "react";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { formatValue } from "@/utils/lib/utils";
import { NS } from "@/constants/ns";

type ItemProps = {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  tidKey: string;
  value: number;
  postfix?: string;
};

export const ProfileBalance: FC<{ items: ItemProps[] }> = ({ items }) => (
  <div className="w-full h-7 grid grid-cols-3 relative mb-6">
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
        "h-full flex flex-row justify-between items-center flex-grow px-3",
        "first:border-r first:border-solid first:border-white/10 first:pl-0",
        "last:border-l last:border-solid last:border-white/10 last:pr-0"
      )}
    >
      <div className="w-full h-full flex flex-row gap-x-[9px] justify-center items-center flex-1">
        {createElement(icon, {
          className: "col-span-1 row-span-2 size-8 object-contain",
        })}
        <div className="flex flex-col w-fit h-full gap-y-1">
          <p className="text-xs text-gray-550 font-inter font-medium ">
            {t(tidKey)}
          </p>
          <p className="text-base leading-none font-black tracking-[0.04em] text-nowrap text-white text-stroke-1 text-shadow-sm">
            {formatValue(value)} {postfix && postfix}
          </p>
        </div>
      </div>
    </div>
  );
};
