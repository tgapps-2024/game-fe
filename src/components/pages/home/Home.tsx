import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import React from "react";

export const Home = () => {
  return (
    <div className="max-h-screen h-screen flex flex-col items-center justify-center bg-blue-800 overflow-y-auto overscroll-contain w-full">
      <h1 className="text-3xl tracking-wide mb-5 text-center font-black text-stroke-1 text-shadow text-white">
        Главная страница
      </h1>
      <div className="flex flex-col gap-4 ">
        <Link href={ROUTES.ASSIGNMENTS}>
          <Button variant="outline" className="text-white w-full">
            Задания
          </Button>
        </Link>
        <Link href={ROUTES.SETTINGS}>
          <Button variant="outline" className="text-white w-full">
            Настройки
          </Button>
        </Link>
      </div>
    </div>
  );
};
