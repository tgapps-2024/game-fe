import { useState } from "react";

import Link from "next/link";

import { motion } from "framer-motion";
import { toast } from "sonner";

import { Modal } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { ROUTES } from "@/constants/routes";
import CloseIcon from "@/public/assets/svg/close.svg";

export const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <div className="flex h-screen max-h-screen w-full flex-col items-center justify-center overflow-y-auto overscroll-contain bg-blue-800">
      <h1 className="text-stroke-1 mb-5 text-center text-3xl font-black tracking-wide text-white text-shadow">
        Главная страница
      </h1>
      <div className="flex flex-col gap-4">
        <Link href={ROUTES.ASSIGNMENTS}>
          <Button variant="link" className="w-full text-white">
            Задания
          </Button>
        </Link>
        <Link href={ROUTES.SETTINGS}>
          <Button variant="link" className="w-full text-white">
            Настройки
          </Button>
        </Link>
        <Link href={ROUTES.BATTLE_PASS}>
          <Button variant="link" className="w-full text-white">
            Battle pass
          </Button>
        </Link>
        <Link href={ROUTES.FRIENDS}>
          <Button variant="link" className="w-full text-white">
            Friends
          </Button>
        </Link>

        <Button
          onClick={() => setModalVisible(true)}
          variant="link"
          className="w-full text-white"
        >
          Modal
        </Button>
        <Button
          onClick={() => {
            toast(<Toast type="destructive" text="Test toast 🚀" />);
          }}
          variant="link"
          className="text-white"
        >
          Toast
        </Button>
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        className="relative flex min-h-56 w-full flex-col items-center rounded-t-4xl border-2 border-b-0 border-white/10 bg-blue-700 px-4 pb-8 pt-9"
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={() => setModalVisible(false)}
          className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-white/5"
        >
          <CloseIcon />
        </motion.button>
        <div className="mb-6 flex size-23 items-center justify-center rounded-full bg-white/20 object-contain text-sm text-white">
          Place for icon
        </div>
      </Modal>
    </div>
  );
};
