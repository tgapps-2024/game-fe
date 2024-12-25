import { Level } from "@/components/ui";
import { useModalVisibility } from "@/hooks/useModalVisibility";
import classNames from "classnames";

export const Skeleton = () => {
  const { isModalVisible } = useModalVisibility();

  return (
    <div className="h-screen overflow-y-auto overscroll-contain w-full">
      <div className="pt-10 flex flex-col relative h-full">
        <div className="h-34" />
        <div className="w-full h-full">
          <div
            className={classNames(
              "bg-blue-800 rounded-t-[32px] transition-all duration-500 ease-in-out transform h-full",
              isModalVisible ? "translate-y-0" : "translate-y-20"
            )}
          >
            <div
              className={classNames(
                "p-4 pt-[78px] relative flex flex-col items-center"
              )}
            >
              <div className="size-25 bg-gray-300 animate-pulse absolute -top-[50px] left-1/2 -translate-x-1/2 rounded-full border-2 border-solid border-white object-cover" />
              <div className="text-3xl w-34 h-8 rounded-2xl bg-gray-300 animate-pulse  mb-5" />
              <div className="flex items-center justify-center mb-5">
                <div className="animate-pulse w-[40.8px] h-6 relative left-1 z-10">
                  <Level className="w-[40.8px] h-6" />
                  <div className="-tracking-wide font-bold absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 text-white level-text" />
                </div>
                <div className="w-25 h-2.5 bg-blue-900 relative">
                  <div className="animate-pulse absolute h-full shadow-green-shadow bg-gradient-to-b from-[#F9E50F] via-[#F9E50F] to-[#EFC609] transition-width duration-300" />
                </div>
                <div className="animate-pulse w-[40.8px] h-6 relative -left-1 z-10">
                  <Level className="w-[40.8px] h-6" />
                  <p className="text-[14.4px] -tracking-wide font-bold absolute top-1/2 left-1/2 transform -translate-y-1/2 level-text -translate-x-1/2 z-10 text-white" />
                </div>
              </div>
              <div
                className={classNames(
                  "animate-pulse w-full mb-6 h-14 pb-[3px] rounded-2xl overflow-hidden border border-black cursor-pointer bg-[#0655a4]"
                )}
              >
                <div
                  className={classNames(
                    "w-full h-full rounded-xl shadow-inner-btn flex justify-center items-center p-[3px] pb-1 bg-[#0075ff]"
                  )}
                >
                  <div
                    className={classNames(
                      "w-full h-11 px-5 py-3 rounded-xl shadow-a flex items-center justify-center bg-white/20"
                    )}
                  ></div>
                </div>
              </div>
              <div className="flex gap-3 w-full mb-5 items-center">
                <div className="size-7 rounded-full bg-gray-300 animate-pulse" />
                <div className="h-4 w-48 rounded-full bg-gray-300 animate-pulse" />
                <div className="ml-auto h-7 w-14 rounded-full bg-gray-300 animate-pulse" />
              </div>
              <div className="flex gap-3 w-full mb-5 items-center">
                <div className="size-7 rounded-full bg-gray-300 animate-pulse" />
                <div className="h-4 w-48 rounded-full bg-gray-300 animate-pulse" />
                <div className="ml-auto h-7 w-14 rounded-full bg-gray-300 animate-pulse" />
              </div>
              <div className="flex gap-3 w-full mb-5 items-center">
                <div className="size-7 rounded-full bg-gray-300 animate-pulse" />
                <div className="h-4 w-48 rounded-full bg-gray-300 animate-pulse" />
                <div className="ml-auto h-7 w-14 rounded-full bg-gray-300 animate-pulse" />
              </div>
              <div className="flex gap-3 w-full mb-5 items-center">
                <div className="size-7 rounded-full bg-gray-300 animate-pulse" />
                <div className="h-4 w-48 rounded-full bg-gray-300 animate-pulse" />
                <div className="ml-auto h-7 w-14 rounded-full bg-gray-300 animate-pulse" />
              </div>
              <div className="flex gap-3 w-full mb-5 items-center">
                <div className="size-7 rounded-full bg-gray-300 animate-pulse" />
                <div className="h-4 w-48 rounded-full bg-gray-300 animate-pulse" />
                <div className="ml-auto h-7 w-14 rounded-full bg-gray-300 animate-pulse" />
              </div>
              <div className="flex gap-3 w-full mb-5 items-center">
                <div className="size-7 rounded-full bg-gray-300 animate-pulse" />
                <div className="h-4 w-48 rounded-full bg-gray-300 animate-pulse" />
                <div className="ml-auto h-7 w-14 rounded-full bg-gray-300 animate-pulse" />
              </div>
              <div className="flex gap-3 w-full mb-5 items-center">
                <div className="size-7 rounded-full bg-gray-300 animate-pulse" />
                <div className="h-4 w-48 rounded-full bg-gray-300 animate-pulse" />
                <div className="ml-auto h-7 w-14 rounded-full bg-gray-300 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
