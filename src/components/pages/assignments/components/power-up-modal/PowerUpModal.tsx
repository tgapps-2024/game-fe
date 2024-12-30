import React from "react";

import Image from "next/image";

import classNames from "classnames";
import { motion } from "framer-motion";

import { Modal } from "@/components/common";
import BackgroundImage from "@/public/assets/png/proposal/1.png";
import ChestSVG from "@/public/assets/svg/chest.svg";
import CloseIcon from "@/public/assets/svg/close.svg";
import StarSVG from "@/public/assets/svg/star.svg";

interface IPowerUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PowerUpModal = ({ isOpen, onClose }: IPowerUpModalProps) => {
  return (
    <Modal
      isVisible={isOpen}
      onClose={onClose}
      className="relative flex w-full flex-col items-center overflow-hidden rounded-t-3xl bg-blue-800 px-4 pb-8 pt-75 font-rubik"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex size-6 items-center justify-center rounded-full bg-white/5"
      >
        <CloseIcon className="size-2.5" />
      </button>
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
            <span className="text-base font-extrabold text-white">+50.000</span>
          </div>
          <div className="flex items-center gap-1">
            <ChestSVG className="h-5 w-6" />
            <span className="text-base font-extrabold text-white">+1</span>
          </div>
        </div>
        <div className="text-stroke-1 px-5 text-center font-rubik text-[28px] font-black leading-none text-white text-shadow">
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
              "shadow-a flex h-11 w-full items-center justify-center gap-1 rounded-xl bg-[#F7DE2D] p-3 text-center font-black uppercase tracking-wide",
            )}
          >
            <span className="text-stroke-half text-base font-black text-white text-shadow-sm">
              Приобрести за
            </span>
            <div className="flex items-center gap-1">
              <StarSVG className="size-[26px]" />
              <span className="text-stroke-half text-base font-black text-white text-shadow-sm">
                1000
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};
