import {
  createElement,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";

import classNames from "classnames";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import AutoPlay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import ChestSVG from "@/public/assets/svg/chest-light.svg";
import StarSVG from "@/public/assets/svg/star.svg";

import { MAP_BACKGROUNDS } from "./constants";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

type Props = {
  onSlideClick: (index: number) => void;
};

export const AssignmentsCarousel: FunctionComponent<Props> = ({
  onSlideClick,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [AutoPlay()]);
  const [activeSlide, setActiveSlide] = useState(0);

  const logActiveSlide = useCallback((emblaApi: EmblaCarouselType) => {
    const activeIndex = emblaApi.selectedScrollSnap();

    setActiveSlide(activeIndex);
  }, []);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => logActiveSlide(emblaApi));
    }
  }, [emblaApi, logActiveSlide]);

  return (
    <>
      <section className="mx-0 mt-4 w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="ml-[calc(0.8rem_*_-1)] flex touch-action-carousel">
            {SLIDES.map((index) => (
              <div
                className="translate-z-0 min-w-0 flex-[0_0_90%] transform pl-3"
                key={index}
                onClick={() => onSlideClick(index)}
              >
                <div
                  className={classNames(
                    "relative z-10 overflow-hidden rounded-2xl border-2 border-solid border-white p-4 transition-opacity duration-300 ease-in-out",
                    { "opacity-30": index !== activeSlide },
                  )}
                >
                  {createElement(MAP_BACKGROUNDS[index], {
                    className:
                      "absolute left-[1px] right-[1px] top-[1px] z-0 rounded-2xl object-cover",
                  })}
                  <div className="relative z-10 flex h-full w-full flex-col gap-1 pt-5.5">
                    <div
                      className={classNames(
                        "flex gap-2 self-start rounded-full border border-solid border-[#363A3D] bg-blue-800/50 px-3 py-1",
                      )}
                    >
                      <div className="flex items-center gap-1">
                        <StarSVG className="size-4" />
                        <span className="text-stroke-half inline-block text-xs font-extrabold text-white text-shadow-sm">
                          +50.000
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChestSVG className="h-4 w-4.5" />
                        <span className="text-stroke-half inline-block text-xs font-extrabold text-white text-shadow-sm">
                          +1
                        </span>
                      </div>
                    </div>
                    <p className="text-stroke-1 mr-20 text-left !text-base font-black uppercase tracking-wider text-white text-shadow-sm">
                      Купите 1 пакет и получите 2 бесплатно
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
