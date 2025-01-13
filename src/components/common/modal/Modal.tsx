import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

interface IModalProps {
  isVisible: boolean;
  children?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  onClose: () => void;
}

export const Modal = ({
  isVisible,
  children,
  className,
  overlayClassName,
  onClose,
}: IModalProps) => {
  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cx("fixed inset-0 z-40 bg-black/60", overlayClassName)}
          onClick={() => {
            onClose();
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 0.2 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2 },
          }}
        >
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto"
            initial={{
              y: "100%",
            }}
            animate={{
              y: 0,
              transition: { duration: 0.25 },
            }}
            exit={{
              y: "100%",
              transition: { duration: 0.25 },
            }}
          >
            <motion.div className="box-border flex min-h-full items-end justify-center font-rubik">
              <div
                className={className}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {children}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
