import React from "react";

import Image from "next/image";

import ManBody from "@/public/assets/png/heroes/body/man.png";
import MessiHead from "@/public/assets/png/heroes/head/messi.png";
import BarcelonaSet from "@/public/assets/png/heroes/set/barcelona.png";

export const HeroView = () => (
  <div className="absolute top-0 left-0 w-1/2 h-full">
    <Image src={ManBody} quality={100} alt="" fill />
    <Image src={MessiHead} quality={100} alt="" fill />
    <Image src={BarcelonaSet} quality={100} alt="" fill />
  </div>
);
