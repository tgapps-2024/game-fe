import Link from "next/link";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Toast } from "@/components/ui/toast";
import { ROUTES } from "@/constants/routes";

export const Home = () => {
  return (
    <Drawer>
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
            onClick={() => {
              toast(<Toast type="destructive" text="Test toast 🚀" />);
            }}
            variant="link"
            className="text-white"
          >
            Toast
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
