import React from "react";

import Image from "next/image";

import ManBody from "@/public/assets/png/heroes/body/man.png";
import MessiHead from "@/public/assets/png/heroes/head/messi.png";
import BarcelonaKit from "@/public/assets/png/heroes/kit/barcelona.png";

export const HeroView = () => (
  <div className="absolute top-0 left-0 w-[56%] h-full">
    <Image src={ManBody} quality={100} alt="" fill />
    <Image src={BarcelonaKit} quality={100} alt="" fill />
    <Image src={MessiHead} quality={100} alt="" fill />
  </div>
);
