import React, { useEffect, useState } from "react";

import { Chevron } from "./components/chevron/Chevron";
import { ReelPane } from "./components/reel-pane/ReelPane";
import { SpinButton } from "./components/spin-button/SpinButton";
import { WinView } from "./components/win-view/WinView";
import { Face } from "./types";

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
  const [isSpinning, setIsSpinning] = useState(false);
  const [isWinViewMode, setIsWinViewMode] = useState(false);
  const [combination, setCombination] = useState<Face[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    let winTimeout: NodeJS.Timeout;

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
            if (!response.length) {
              clearInterval(interval);

              const isWinCombination = new Set(resp).size === 1;

              if (isWinCombination) {
                winTimeout = setTimeout(() => {
                  setIsWinViewMode(true);
                }, 100);
              }
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

      if (winTimeout) {
        clearTimeout(timeout);
      }
    };
  }, [isSpinning]);

  return (
    <div className="flex min-h-0 grow flex-col">
      <div className="mt-auto aspect-[0.51] max-h-full w-full">
        <div className="relative h-full w-full bg-[url('/assets/png/slot-machine/slot-machine-red.webp')] bg-[length:100%_100%]">
          <ReelPane combination={combination} isSpinning={isSpinning} />

          <Chevron combination={combination} isSpinning={isSpinning} />

          <Chevron combination={combination} isSpinning={isSpinning} isRight />

          <SpinButton
            onSpinClick={() => {
              if (!isSpinning) {
                setIsSpinning(true);
                setCombination([]);
              }
            }}
          />

          <WinView
            combination={combination}
            isActive={isWinViewMode}
            onClick={() => {
              setIsWinViewMode(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};
