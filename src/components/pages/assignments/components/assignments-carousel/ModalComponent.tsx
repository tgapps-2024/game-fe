import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { motion } from "framer-motion";

import CloseIcon from "@/public/assets/svg/close.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  contentWrapperClassName?: string;
  contentClassName?: string;
}

export const Modal: React.FunctionComponent<ModalProps> = ({
  isOpen,
  onClose,
  content,
  contentWrapperClassName,
  contentClassName,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      } transition-opacity duration-300`}
    >
      <motion.div
        className={classNames(
          "relative w-full rounded-t-lg shadow-lg",
          contentWrapperClassName,
        )}
        initial={{ opacity: 0, translateY: 100 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          translateY: isVisible ? 0 : 100,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className={contentClassName}>{content}</div>
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex size-6 items-center justify-center rounded-full bg-white/5"
        >
          <CloseIcon className="size-2.5" />
        </button>
      </motion.div>
    </div>
  );
};
