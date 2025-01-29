import React from "react";

import classNames from "classnames";

import { Header } from "./components/header/Header";

export const AssignmentsSkeleton = () => {
  return (
    <div className="mx-4 mt-28 w-full">
      <Header />
      <div className="mb-6 mt-4 h-30 w-full animate-pulse rounded-[20px] bg-blue-700" />
      <div className="mb-4 flex justify-between">
        <div className="h-6 w-40 animate-pulse rounded-[20px] bg-blue-700" />
        <div className="h-6 w-8 animate-pulse rounded-[20px] bg-blue-700" />
      </div>
      <ul className="mb-4 overflow-hidden rounded-[18px] border border-solid border-white/10 bg-blue-700">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <li
              key={index}
              className={classNames(
                "grid grid-cols-[32px_1fr] items-center gap-2 border-b border-solid border-white/10 px-4 py-3",
                "last:border-none",
              )}
            >
              <div className="size-8 animate-pulse rounded-full bg-blue-400" />
              <div className="flex flex-col gap-1">
                <div className="h-4 w-30 animate-pulse rounded-[20px] bg-blue-400" />
                <div className="flex gap-2">
                  <div className="flex gap-1">
                    <div className="size-4 animate-pulse rounded-[20px] bg-blue-400" />
                    <div className="h-4 w-8 animate-pulse rounded-[20px] bg-blue-400" />
                  </div>
                  <div className="flex gap-1">
                    <div className="size-4 animate-pulse rounded-[20px] bg-blue-400" />
                    <div className="h-4 w-8 animate-pulse rounded-[20px] bg-blue-400" />
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <div className="mb-4 flex justify-between">
        <div className="h-6 w-40 animate-pulse rounded-[20px] bg-blue-700" />
        <div className="h-6 w-8 animate-pulse rounded-[20px] bg-blue-700" />
      </div>
      <ul className="overflow-hidden rounded-[18px] border border-solid border-white/10 bg-blue-700">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <li
              key={index}
              className={classNames(
                "grid grid-cols-[32px_1fr] items-center gap-2 border-b border-solid border-white/10 px-4 py-3",
                "last:border-none",
              )}
            >
              <div className="size-8 animate-pulse rounded-full bg-blue-400" />
              <div className="flex flex-col gap-1">
                <div className="h-4 w-30 animate-pulse rounded-[20px] bg-blue-400" />
                <div className="flex gap-2">
                  <div className="flex gap-1">
                    <div className="size-4 animate-pulse rounded-[20px] bg-blue-400" />
                    <div className="h-4 w-8 animate-pulse rounded-[20px] bg-blue-400" />
                  </div>
                  <div className="flex gap-1">
                    <div className="size-4 animate-pulse rounded-[20px] bg-blue-400" />
                    <div className="h-4 w-8 animate-pulse rounded-[20px] bg-blue-400" />
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
