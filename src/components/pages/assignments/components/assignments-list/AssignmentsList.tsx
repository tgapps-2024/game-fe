import { createElement, FunctionComponent } from "react";

import { useTranslations } from "next-intl";

import classNames from "classnames";

import { NS } from "@/constants/ns";
import ArrowIcon from "@/public/assets/svg/arrow.svg";
import { formatNumber } from "@/utils/number";

import { ASSIGNMENTS_ICONS, REWARD_ICONS } from "./constants";
import { AssignmentListItem, AssignmentType } from "./types";

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
      <div className="flex items-center justify-between">
        <div className="text-stroke-1 text-nowrap text-2xl font-black leading-none tracking-[0.04em] text-white text-shadow-sm">
          {t(`${NS.PAGES.ASSIGNMENTS.TYPES.ROOT}.${type}`)}
        </div>
        <div className="text-stroke-1 text-nowrap rounded-[20px] bg-blue-700 px-3 py-1 text-xs font-black tracking-[0.04em] text-white text-shadow-sm">
          {list.length}
        </div>
      </div>
      <ul className="rounded-[18px] border border-solid border-white/10 bg-blue-700 px-4 py-3">
        {list.map(({ icon, id, title, rewards }) => (
          <li
            key={id}
            className={classNames(
              "grid grid-cols-[32px_1fr_24px] items-center gap-2 border-b border-solid border-white/10 py-3",
              "first:pt-0",
              "last:border-none last:pb-0",
            )}
          >
            {createElement(ASSIGNMENTS_ICONS[icon], {
              className: "size-8 rounded-full object-contain",
            })}
            <div className="flex flex-col gap-1">
              <p className="text-stroke-half text-sm font-black leading-none tracking-wide text-shadow-sm">
                {title}
              </p>
              <div className="flex gap-2">
                {rewards.map(({ count, type }) => (
                  <div
                    key={type}
                    className="text-stroke-half flex items-center gap-1 text-xs font-extrabold text-yellow-500 text-shadow-sm"
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
