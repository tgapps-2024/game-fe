import React, { FunctionComponent } from "react";

import classNames from "classnames";
import { HTMLMotionProps, motion } from "framer-motion";

type Variant = "primary" | "secondary";

type Size = "small" | "medium" | "large";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  buttonClassName?: string;
} & HTMLMotionProps<"button">;

export const PrimaryButton: FunctionComponent<Props> = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  buttonClassName,
  className,
  ...props
}) => {
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={classNames(
        "group w-full cursor-pointer overflow-hidden border border-black",
        { "bg-[#0655a4]": variant === "primary" },
        { "bg-[#009F00]": variant === "secondary" },
        { "bg-blue-800 pb-0": disabled },
        { "pb-[3px]": !disabled },
        { "h-10 rounded-xl": size === "small" },
        { "h-13 rounded-2xl": size === "medium" },
        { "h-14 rounded-2xl": size === "large" },
        buttonClassName,
      )}
      {...props}
    >
      <div
        className={classNames(
          "flex h-full w-full items-center justify-center p-[3px] pb-1",
          { "bg-[#0075ff]": variant === "primary" },
          { "bg-[#02DB07]": variant === "secondary" },
          { "bg-blue-800 shadow-none": disabled },
          { "shadow-inset-btn": !disabled },
          { "rounded-xl": size === "small" },
          { "rounded-2xl": size === "medium" },
          { "rounded-2xl": size === "large" },
        )}
      >
        <div
          className={classNames(
            "text-stroke-1 flex h-full w-full items-center justify-center px-5 font-black leading-none tracking-wide text-white text-shadow-sm",
            { "rounded-lg text-base": size === "small" },
            { "rounded-xl text-base": size === "medium" },
            { "rounded-xl text-lg": size === "large" },
            { "bg-blue-800/100 text-white/50 shadow-none": disabled },
            { "shadow-link": !disabled },
            { "bg-white/15": variant === "primary" && !disabled },
            { "bg-white/40": variant === "secondary" && !disabled },
            className,
          )}
        >
          {children}
        </div>
      </div>
    </motion.button>
  );
};
