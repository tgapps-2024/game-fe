import { useEffect, useState } from "react";

import { Spinner } from "@/components/common/spinner/Spinner";
import { useTelegram } from "@/context";

import { AssignmentsCarousel } from "./components/assignments-carousel/AssignmentsCarousel";
import { AssignmentsHeader } from "./components/assignments-header/AssignmentsHeader";
import { AssignmentsList } from "./components/assignments-list/AssignmentsList";
import { PowerUpModal } from "./components/power-up-modal/PowerUpModal";
import { ASSIGNMENTS_LIST } from "./constants";

export const Assignments = () => {
  const { webApp } = useTelegram();
  const [isLoading, setIsLoading] = useState(true);

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (webApp) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
      } else {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    };

    loadData();
  }, [webApp]);

  const handleSlideClick = (index: number) => {
    console.log("🚀 ~ handleSlideClick ~ index:", index);
    setModalVisible(true);
  };

  if (!webApp || !webApp.initDataUnsafe?.user || isLoading) {
    return (
      <div className="flex h-screen max-h-screen w-full items-center justify-center overflow-y-auto overscroll-contain bg-blue-800 py-10">
        <Spinner className="mx-auto" />
      </div>
    );
  }

  return (
    //TODO: investigate why scroll doesn't work
    <div className="h-screen max-h-screen w-full overflow-y-auto overscroll-contain bg-blue-800 py-10">
      <div className="flex flex-col">
        <AssignmentsHeader />
        <AssignmentsCarousel onSlideClick={handleSlideClick} />
        <div className="flex flex-col gap-4">
          <AssignmentsList list={ASSIGNMENTS_LIST} />
        </div>
      </div>
      <PowerUpModal
        isOpen={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};
