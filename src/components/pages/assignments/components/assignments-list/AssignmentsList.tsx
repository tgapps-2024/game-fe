import { NS } from "@/constants/ns";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import React, { createElement, FunctionComponent } from "react";
import { AssignmentListItem, AssignmentType } from "./types";
import ArrowIcon from "@/public/assets/svg/arrow.svg";
import { ASSIGNMENTS_ICONS, REWARD_ICONS } from "./constants";
import { formatNumber } from "@/utils/number";

type Props = {
  type?: AssignmentType;
  list: AssignmentListItem[];
};

export const AssignmentsList: FunctionComponent<Props> = ({
  type = AssignmentType.DAILY,
  list,
}) => {
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl leading-none font-black tracking-[0.04em] text-nowrap text-white text-stroke-1 text-shadow-sm">
          {t(`${NS.PAGES.ASSIGNMENTS.TYPES.ROOT}.${type}`)}
        </div>
        <div className="px-3 py-1 bg-blue-700 rounded-[20px] text-xs font-black tracking-[0.04em] text-nowrap text-white text-stroke-1 text-shadow-sm">
          {list.length}
        </div>
      </div>
      <ul className="rounded-[18px] py-3 px-4 bg-blue-700 border border-solid border-white/10">
        {list.map(({ icon, id, title, rewards }) => (
          <li
            key={id}
            className={classNames(
              "border-b border-solid border-white/10 py-3 grid grid-cols-[32px_1fr_24px] gap-2 items-center",
              "first:pt-0",
              "last:pb-0 last:border-none"
            )}
          >
            {createElement(ASSIGNMENTS_ICONS[icon], {
              className: "size-8 rounded-full object-contain",
            })}
            <div className="flex flex-col gap-1">
              <p className="text-sm leading-none font-black tracking-wide text-shadow-sm text-stroke-half">
                {title}
              </p>
              <div className="flex gap-2">
                {rewards.map(({ count, type }) => (
                  <div
                    key={type}
                    className="text-xs font-extrabold text-yellow-500 text-shadow-sm text-stroke-half flex items-center gap-1"
                  >
                    {createElement(REWARD_ICONS[type], {
                      className: "size-4",
                    })}
                    + {formatNumber(count)}
                  </div>
                ))}
              </div>
            </div>

            <ArrowIcon className="ml-auto size-6 stroke-white" />
          </li>
        ))}
      </ul>
    </div>
  );
};
