import React, { FunctionComponent } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import classNames from "classnames";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

import { Card, CardType } from "@/components/common";
import { HSPieceImage } from "@/components/hs-shared";
import { CollectButtonColor } from "@/components/ui";
import { NS } from "@/constants/ns";
import Chevron from "@/public/assets/png/chevron.webp";
import {
  HeroClothPiece,
  HeroClothPieceConfig,
  HeroId,
  HeroRarity,
} from "@/services/heroes/types";

import { usePrevNextButtons } from "./hooks";

type Props = {
  clothPiece: HeroClothPiece;
  clothPieceConfig: HeroClothPieceConfig;
  heroId: HeroId;
  heroRarity: HeroRarity;
};

const clothPieceClassName = {
  [HeroClothPiece.CHAIN]: "scale-[3] -translate-x-[5%] translate-y-[5%]",
  [HeroClothPiece.HAT]: "scale-150 translate-y-[48%]",
  [HeroClothPiece.GLASS]: "scale-[2] translate-y-[36%]",
  [HeroClothPiece.KIT]: "scale-125 -translate-y-[20%]",
  [HeroClothPiece.WATCH]: "scale-[4] translate-x-[48%] -translate-y-[60%]",
};

export const ClothCarousel: FunctionComponent<Props> = ({
  clothPiece,
  clothPieceConfig,
  heroId,
  heroRarity,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const {
    isPrevBtnDisabled,
    isNextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const t = useTranslations(NS.PAGES.HEROES.ROOT);

  return (
    <div className="relative -mx-4 overflow-hidden px-4 pt-2" ref={emblaRef}>
      <div className="-ml-2 flex">
        {Object.values(clothPieceConfig).map((cloth) => (
          <div key={cloth.id} className="shrink-0 basis-1/3 pl-2">
            <Card
              type={CardType.ORANGE}
              collectButtonProps={{
                color: CollectButtonColor.GREEN,
                children: t(
                  `${NS.PAGES.HEROES.LABELS.ROOT}.${NS.PAGES.HEROES.LABELS.BUY}`,
                ),
              }}
              onClick={() => {}}
            >
              <HSPieceImage
                className={classNames(
                  "h-full w-full",
                  clothPieceClassName[clothPiece],
                )}
                heroId={heroId}
                heroRarity={heroRarity}
                part={clothPiece}
                clothNumber={cloth.id}
                alt={`${clothPiece}-${cloth.id}`}
                sizes="33vw"
                fill
              />
            </Card>
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
