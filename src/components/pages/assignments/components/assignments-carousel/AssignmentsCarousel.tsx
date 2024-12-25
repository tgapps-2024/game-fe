import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { FunctionComponent, useCallback, useEffect } from "react";
import AssignementsBg from "@/public/assets/png/assignments-bg.png";
import Image from "next/image";
import AutoPlay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import StarSVG from "@/public/assets/svg/star.svg";
import ChestSVG from "@/public/assets/svg/chest.svg";

export const AssignmentsCarousel: FunctionComponent = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const logSlidesInView = useCallback(
    (emblaApi: { slidesInView: () => unknown }) => {
      console.log("🚀 ~ emblaApi:", emblaApi.slidesInView());
    },
    []
  );

  useEffect(() => {
    if (emblaApi) emblaApi.on("slidesInView", logSlidesInView);
  }, [emblaApi, logSlidesInView]);

  return (
    <Carousel
      orientation="horizontal"
      opts={{ loop: true }}
      plugins={[AutoPlay({ delay: 7500 })]}
      className="w-full mb-6"
    >
      <CarouselContent className="-ml-1 touch-action-carousel" ref={emblaRef}>
        {[1, 2, 3].map((i) => (
          <CarouselItem key={i} className="pl-1 flex-[0_0_90%]">
            <div className="px-1">
              <div className="p-4 rounded-2xl relative border border-solid border-white">
                <div className="absolute top-0 left-0 w-full h-full">
                  <Image src={AssignementsBg} alt="bg" fill />
                </div>

                <div className="w-full h-full pt-5.5 relative z-10 flex flex-col gap-1">
                  <div className="flex px-3 self-start py-1 rounded-full bg-blue-800/50 border border-solid border-[#363A3D] gap-2">
                    <div className="flex gap-1 items-center">
                      <StarSVG className="size-4" />
                      <span className="font-rubik font-extrabold text-xs text-shadow-sm text-stroke-half">
                        +50.000
                      </span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <ChestSVG className="w-4.5 h-4" />
                      <span className="font-rubik font-extrabold text-xs text-shadow-sm text-stroke-half">
                        +1
                      </span>
                    </div>
                  </div>
                  <p className="font-rubik font-black tracking-wider text-shadow-sm text-stroke-1 mr-28">
                    Купите 1 пакет и получите 2 бесплатно
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
