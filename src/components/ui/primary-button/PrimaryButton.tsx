import React, { FunctionComponent } from "react";

import classNames from "classnames";
import { HTMLMotionProps, motion } from "framer-motion";

type Variant = "primary" | "secondary";

type Size = "small" | "medium" | "large";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
} & HTMLMotionProps<"button">;

export const PrimaryButton: FunctionComponent<Props> = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  className,
  ...props
}) => {
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={classNames(
        "group w-full cursor-pointer overflow-hidden rounded-xl border border-black",
        { "bg-[#0655a4]": variant === "primary" },
        { "bg-[#009F00]": variant === "secondary" },
        { "bg-blue-800 pb-0": disabled },
        { "pb-[3px]": !disabled },
        { "h-10": size === "small" },
        { "h-13": size === "medium" },
        { "h-14": size === "large" },
      )}
      {...props}
    >
      <div
        className={classNames(
          "flex h-full w-full items-center justify-center rounded-[8px] p-[3px] pb-1",
          { "bg-[#0075ff]": variant === "primary" },
          { "bg-[#02DB07]": variant === "secondary" },
          { "bg-blue-800 shadow-none": disabled },
          { "shadow-inset-btn": !disabled },
        )}
      >
        <div
          className={classNames(
            "text-stroke-1 flex h-full w-full items-center justify-center rounded-[8px] px-5 font-black leading-none tracking-wide text-shadow-sm",
            { "text-sm": size === "small" },
            { "text-base": size === "medium" },
            { "text-lg": size === "large" },
            { "bg-blue-800/100 shadow-none": disabled },
            { "bg-white/15 shadow-link": !disabled },
            className,
          )}
        >
          {children}
        </div>
      </div>
    </motion.button>
  );
};
