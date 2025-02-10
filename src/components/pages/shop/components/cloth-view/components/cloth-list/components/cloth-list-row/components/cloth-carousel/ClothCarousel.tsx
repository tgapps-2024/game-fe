import React, { FunctionComponent } from "react";

import useEmblaCarousel from "embla-carousel-react";

import { Card, CardType } from "@/components/common";
import { HeroView } from "@/components/hs-shared";
import {
  HeroClothPieceConfig,
  HeroId,
  HeroRarity,
} from "@/services/heroes/types";

type Props = {
  clothPieceConfig: HeroClothPieceConfig;
};

export const ClothCarousel: FunctionComponent<Props> = ({
  clothPieceConfig,
}) => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="-mx-4 overflow-hidden px-4" ref={emblaRef}>
      <div className="-ml-2 flex">
        {Object.values(clothPieceConfig).map((cloth) => (
          <div key={cloth?.id} className="shrink-0 basis-1/3 pl-2">
            <Card type={CardType.ORANGE} onClick={() => {}}>
              <HeroView
                className="absolute h-full w-full"
                heroId={HeroId.DUROV}
                heroRarity={HeroRarity.EPIC}
                source="grid"
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
