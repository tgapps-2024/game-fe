import React, { FunctionComponent } from "react";

import Image from "next/image";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

import Chevron from "@/public/assets/png/chevron.webp";
import {
  HeroClothPiece,
  HeroId,
  HeroRarity,
  IHeroClothConfig,
  SelectedCloth,
} from "@/services/heroes/types";

import { ClothCard } from "../cloth-card/ClothCard";

import { usePrevNextButtons } from "./hooks";

type Props = {
  clothPiece: HeroClothPiece;
  clothPieceConfigs: IHeroClothConfig[];
  heroId: HeroId;
  heroRarity: HeroRarity;
  ownCloth: number[];
  heroCloth: SelectedCloth;
  selectedHeroCloth: SelectedCloth;
  onCardClick: (clothPiece: HeroClothPiece, clothId: number) => void;
};

export const ClothCarousel: FunctionComponent<Props> = ({
  clothPiece,
  clothPieceConfigs,
  heroId,
  heroRarity,
  ownCloth,
  heroCloth,
  selectedHeroCloth,
  onCardClick,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const {
    isPrevBtnDisabled,
    isNextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="relative -mx-4 overflow-hidden px-4 pt-2" ref={emblaRef}>
      <div className="-ml-2 flex will-change-transform">
        {clothPieceConfigs.map((cloth) => (
          <div key={cloth.id} className="shrink-0 basis-1/3 pl-2">
            <ClothCard
              clothPiece={clothPiece}
              clothPieceConfig={cloth}
              heroId={heroId}
              heroRarity={heroRarity}
              isCurrentCloth={heroCloth[clothPiece] === cloth.id}
              isSelectedCloth={selectedHeroCloth[clothPiece] === cloth.id}
              isOwnCloth={ownCloth.includes(cloth.id)}
              onCardClick={onCardClick}
            />
          </div>
        ))}
      </div>
      {!isPrevBtnDisabled && (
        <motion.button
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={onPrevButtonClick}
          className="absolute inset-y-0 left-1 my-auto h-[26px] w-[26px]"
        >
          <Image
            className="absolute top-0 max-h-full rotate-180"
            src={Chevron}
            width={26}
            height={26}
            alt="Next"
          />
        </motion.button>
      )}
      {!isNextBtnDisabled && (
        <motion.button
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={onNextButtonClick}
          className="absolute inset-y-0 right-1 my-auto h-[26px] w-[26px]"
        >
          <Image
            className="absolute top-0 max-h-full"
            src={Chevron}
            width={26}
            height={26}
            alt="Next"
          />
        </motion.button>
      )}
    </div>
  );
};
