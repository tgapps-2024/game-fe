import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export const Home = () => {
  return (
    <div className="flex h-screen max-h-screen w-full flex-col items-center justify-center overflow-y-auto overscroll-contain bg-blue-800">
      <h1 className="text-stroke-1 mb-5 text-center text-3xl font-black tracking-wide text-white text-shadow">
        Главная страница
      </h1>
      <div className="flex flex-col gap-4">
        <Link href={ROUTES.ASSIGNMENTS}>
          <Button variant="outline" className="w-full text-white">
            Задания
          </Button>
        </Link>
        <Link href={ROUTES.SETTINGS}>
          <Button variant="outline" className="w-full text-white">
            Настройки
          </Button>
        </Link>
      </div>
    </div>
  );
};
