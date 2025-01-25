import React, { FunctionComponent, ReactNode } from "react";

import classNames from "classnames";

interface TimelineItem {
  id: number;
  description: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: FunctionComponent<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      <ul className="flex flex-col">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={classNames(
              "relative mb-4 flex w-full justify-start",
              "last:mb-0",
            )}
          >
            <div className="grid grid-cols-[40px_1fr] items-center gap-2">
              <div className="z-10 flex size-10 items-center justify-center rounded-full bg-blue-800">
                <span className="text-sm font-semibold leading-none text-white">
                  {item.id}
                </span>
              </div>
              <div>{item.description}</div>
            </div>
            {index < items.length - 1 && (
              <div className="absolute left-[18.5px] top-9.5 z-0 grid h-4 grid-rows-2 gap-1 py-0.5">
                <div className="h-full w-[1px] rounded-full bg-white" />
                <div className="h-full w-[1px] rounded-full bg-white" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
