import React from "react";

import Image from "next/image";

import classNames from "classnames";
import { motion } from "framer-motion";

import BackgroundImage from "@/public/assets/png/proposal/1.png";
import ChestSVG from "@/public/assets/svg/chest.svg";
import StarSVG from "@/public/assets/svg/star.svg";

export const MainModal = () => {
  return (
    <div className="relative flex w-full flex-col items-center overflow-hidden rounded-t-3xl bg-blue-800 px-4 pb-8 pt-75">
      <div className="absolute inset-0 z-0">
        <Image src={BackgroundImage} alt="" fill objectFit="cover" priority />
      </div>
      <div className="z-10 mb-6 flex flex-col items-center gap-3">
        <div
          className={classNames(
            "mx-auto flex gap-2 self-start rounded-full bg-blue-800/50 px-3 py-1",
          )}
        >
          <div className="flex items-center gap-1">
            <StarSVG className="size-6" />
            <span className="text-base font-extrabold">+50.000</span>
          </div>
          <div className="flex items-center gap-1">
            <ChestSVG className="h-5 w-6" />
            <span className="text-base font-extrabold">+1</span>
          </div>
        </div>
        <div className="text-stroke-1 px-5 text-center text-3xl font-black leading-none text-shadow-sm">
          Получи 15.000 спинов по супер скидке!
        </div>
        <p className="text-center text-xs font-medium tracking-wide text-gray-550">
          Complete a daily Stars transaction and receive massive rewards
        </p>
      </div>
      <motion.div
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={classNames(
          "group z-10 h-[58px] w-full cursor-pointer overflow-hidden rounded-2xl border border-black bg-[#A6552D] pb-[3px]",
        )}
      >
        <div
          className={classNames(
            "shadow-inner-btn flex h-13 w-full items-center justify-center rounded-xl bg-[#EFC609] p-[3px] pb-1",
          )}
        >
          <div
            className={classNames(
              "shadow-a text-stroke-1 flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-[#F7DE2D] p-3 text-center font-black uppercase tracking-wide text-shadow-sm",
            )}
          >
            <span>Приобрести за </span>
            <div className="flex items-center gap-1">
              <StarSVG className="size-[26px]" />
              <span className="text-base font-extrabold">1000</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
