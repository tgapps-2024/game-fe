import { Level } from "@/components/ui";
import classNames from "classnames";
import { FC } from "react";

export const LevelIndicator: FC<{
  currentLevel: number;
  progress: number;
  isLoading: boolean;
}> = ({ currentLevel, progress, isLoading }) => (
  <div className="flex items-center justify-center mb-5">
    {isLoading ? (
      <div className="w-[40.8px] h-6 relative left-1 z-10 bg-slate-300 animate-pulse rounded-3xl" />
    ) : (
      <div className="w-[40.8px] h-6 relative left-1 z-10">
        <Level className="w-[40.8px] h-6" />
        <p className="text-[14.4px] -tracking-wide font-bold absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 text-white level-text">
          {currentLevel}
        </p>
      </div>
    )}
    <div
      className={classNames("w-25 h-2.5 bg-blue-900 relative", {
        "animate-pulse": isLoading,
      })}
    >
      <div
        className={classNames(
          "absolute h-full shadow-green-shadow bg-gradient-to-b from-[#F9E50F] via-[#F9E50F] to-[#EFC609] transition-width duration-300"
        )}
        style={{
          width: `${isLoading ? 0 : progress}%`,
        }}
      ></div>
    </div>
    {isLoading ? (
      <div className="w-[40.8px] h-6 relative -left-1 z-10 bg-slate-300 animate-pulse rounded-3xl" />
    ) : (
      <div className="w-[40.8px] h-6 relative -left-1 z-10">
        <Level className="w-[40.8px] h-6" />
        <p className="text-[14.4px] -tracking-wide font-bold absolute top-1/2 left-1/2 transform -translate-y-1/2 level-text -translate-x-1/2 z-10 text-white">
          {currentLevel + 1}
        </p>
      </div>
    )}
  </div>
);
