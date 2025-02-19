import React, { useEffect, useState } from "react";

import Image from "next/image";

import classNames from "classnames";

import ReelCenterBg1 from "@/public/assets/png/slot-machine/reel-center-bg-1.webp";
import ReelCenterBg2 from "@/public/assets/png/slot-machine/reel-center-bg-2.webp";
import ReelSideBg1 from "@/public/assets/png/slot-machine/reel-side-bg-1.webp";
import ReelSideBg2 from "@/public/assets/png/slot-machine/reel-side-bg-2.webp";
import SpinButtonBase from "@/public/assets/png/slot-machine/spin-btn-base.webp";
import SpinButtonGreen from "@/public/assets/png/slot-machine/spin-btn-green.webp";
import SpinButtonStub from "@/public/assets/png/slot-machine/spin-btn-stub.webp";

type Face = "chest" | "booster" | "bucket";

const stopClassNames: Record<Face, string> = {
  chest: "[background-position-y:0%]",
  booster: "[background-position-y:33.33%]",
  bucket: "[background-position-y:66.66%]",
};

const faces = ["chest", "booster", "bucket"];

function getRandomFace() {
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(2);
  const num = Math.floor(
    Math.random() * (maxFloored - minCeiled + 1) + minCeiled,
  );

  return faces[num];
}

export const Machine = () => {
  const [isSpinButtonTouched, setIsSpinButtonTouched] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [combination, setCombination] = useState<Face[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (isSpinning) {
      console.log("Fake run");

      new Promise<string[]>((resolve) => {
        timeout = setTimeout(
          () => resolve(Array.from({ length: 3 }).map(getRandomFace)),
          1000,
        );
      }).then((resp) => {
        const response = [...resp];
        console.log(`Fake response: ${response}`);

        interval = setInterval(() => {
          const face = response.shift() as Face;

          setCombination((prevValue) => {
            console.log(`Setting face: ${face}. Next: ${response}`);

            if (!response.length) {
              console.log("Clearing interval");
              clearInterval(interval);
            }

            return [...prevValue, face];
          });

          if (!response.length) {
            setIsSpinning(false);
          }
        }, 500);
      });
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSpinning]);

  const [reelFace1, reelFace2, reelFace3] = combination;

  return (
    <div className="relative h-full w-full bg-[url('/assets/png/slot-machine/slot-machine-red.webp')] bg-[length:100%_100%]">
      <div className="absolute bottom-[28.4%] left-[12.5%] top-[41.8%] w-[24%] overflow-hidden">
        <Image
          className="absolute"
          src={ReelSideBg1}
          alt=""
          fill
          quality={100}
        />
        <div
          className={classNames(
            "absolute bottom-0 left-[20.6%] right-[14.1%] h-[300%] bg-[url('/assets/png/slot-machine/reel-symbols-bg.webp')] bg-[length:100%_33.3%] [background-position-x:100%]",
            {
              "[background-position-y:0%]": !reelFace1,
              "animate-reel-spin": isSpinning && !reelFace1,
              [stopClassNames[reelFace1]]: !!reelFace1,
            },
          )}
        />
        <Image
          className="absolute"
          src={ReelSideBg2}
          alt=""
          fill
          quality={100}
        />
      </div>
      <div className="absolute bottom-[28.4%] left-[38.8%] top-[41.5%] w-[22.5%] overflow-hidden">
        <Image
          className="absolute"
          src={ReelCenterBg1}
          alt=""
          fill
          quality={100}
        />
        <div
          className={classNames(
            "absolute bottom-0 left-[14.7%] right-[14.7%] h-[300%] bg-[url('/assets/png/slot-machine/reel-symbols-bg.webp')] bg-[length:100%_33.3%] [background-position-x:100%]",
            {
              "[background-position-y:0%]": !reelFace2,
              "animate-reel-spin": isSpinning && !reelFace2,
              [stopClassNames[reelFace2]]: !!reelFace2,
            },
          )}
        />
        <Image
          className="absolute"
          src={ReelCenterBg2}
          alt=""
          fill
          quality={100}
        />
      </div>
      <div className="absolute bottom-[28.4%] left-[63.5%] top-[41.8%] w-[24%] overflow-hidden">
        <Image
          className="absolute [transform:rotateY(180deg)]"
          src={ReelSideBg1}
          alt=""
          fill
          quality={100}
        />
        <div
          className={classNames(
            "absolute bottom-0 left-[20.6%] right-[14.1%] h-[300%] bg-[url('/assets/png/slot-machine/reel-symbols-bg.webp')] bg-[length:100%_33.3%] [background-position-x:100%]",
            {
              "[background-position-y:0%]": !reelFace3,
              "animate-reel-spin": isSpinning && !reelFace3,
              [stopClassNames[reelFace3]]: !!reelFace3,
            },
          )}
        />
        <Image
          className="absolute [transform:rotateY(180deg)]"
          src={ReelSideBg2}
          alt=""
          fill
          quality={100}
        />
      </div>
      <div className="absolute left-[29.5%] top-[75.7%] h-[16.7%] w-[43.85%]">
        <Image
          className="absolute"
          src={SpinButtonBase}
          alt=""
          fill
          quality={100}
        />
        <div
          className={classNames(
            "absolute inset-0 bottom-[23.1%] m-auto transition-[top_0.3s_linear,width_0.3s_linear]",
            {
              "top-0 w-[77.7%]": !isSpinButtonTouched,
              "top-[14.9%] w-[78.9%]": isSpinButtonTouched,
            },
          )}
        >
          <Image src={SpinButtonGreen} alt="" fill quality={100} />
        </div>
        <div
          className="absolute inset-x-0 bottom-[20.1%] mx-auto h-[48.4%] w-[85%]"
          onClick={() => {
            if (!isSpinning) {
              setIsSpinning(true);
              setCombination([]);
            }
          }}
          onTouchStart={() => {
            if (!isSpinning) {
              setIsSpinButtonTouched(true);
            }
          }}
          onTouchEnd={() => {
            if (isSpinButtonTouched) {
              setIsSpinButtonTouched(false);
            }
          }}
        >
          <Image src={SpinButtonStub} alt="" fill quality={100} />
        </div>
      </div>
    </div>
  );
};
