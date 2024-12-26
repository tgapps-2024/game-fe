import { FunctionComponent, useCallback, useEffect } from "react";

import Image from "next/image";

import AutoPlay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AssignementsBg from "@/public/assets/png/assignments-bg.png";
import ChestSVG from "@/public/assets/svg/chest.svg";
import StarSVG from "@/public/assets/svg/star.svg";

export const AssignmentsCarousel: FunctionComponent = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const logSlidesInView = useCallback(
    (emblaApi: { slidesInView: () => unknown }) => {
      console.log("🚀 ~ emblaApi:", emblaApi.slidesInView());
    },
    [],
  );

  useEffect(() => {
    if (emblaApi) emblaApi.on("slidesInView", logSlidesInView);
  }, [emblaApi, logSlidesInView]);

  return (
    <Carousel
      orientation="horizontal"
      opts={{ loop: true }}
      plugins={[AutoPlay({ delay: 7500 })]}
      className="mb-6 w-full"
    >
      <CarouselContent className="-ml-1 touch-action-carousel" ref={emblaRef}>
        {[1, 2, 3].map((i) => (
          <CarouselItem key={i} className="flex-[0_0_90%] pl-1">
            <div className="px-1">
              <div className="relative rounded-2xl border border-solid border-white p-4">
                <div className="absolute left-0 top-0 h-full w-full">
                  <Image src={AssignementsBg} alt="bg" fill />
                </div>

                <div className="relative z-10 flex h-full w-full flex-col gap-1 pt-5.5">
                  <div className="flex gap-2 self-start rounded-full border border-solid border-[#363A3D] bg-blue-800/50 px-3 py-1">
                    <div className="flex items-center gap-1">
                      <StarSVG className="size-4" />
                      <span className="text-stroke-half font-rubik text-xs font-extrabold text-shadow-sm">
                        +50.000
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChestSVG className="h-4 w-4.5" />
                      <span className="text-stroke-half font-rubik text-xs font-extrabold text-shadow-sm">
                        +1
                      </span>
                    </div>
                  </div>
                  <p className="text-stroke-1 mr-28 font-rubik font-black tracking-wider text-shadow-sm">
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
