import { useState } from "react";

import { ProfileHeader } from "@/components/common";
import { Spinner } from "@/components/common/spinner/Spinner";
import { useTelegram } from "@/context";
import { useGetProfile } from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";

import { AssignmentsCarousel } from "./components/assignments-carousel/AssignmentsCarousel";
import { AssignmentsList } from "./components/assignments-list/AssignmentsList";
import { AssignmentType } from "./components/assignments-list/types";
import { PowerUpModal } from "./components/power-up-modal/PowerUpModal";
import { ASSIGNMENTS_LIST } from "./constants";

export const Assignments = () => {
  const { webApp } = useTelegram();
  const { data, isPending } = useGetProfile();

  const [isModalVisible, setModalVisible] = useState(false);

  const handleSlideClick = () => {
    setModalVisible(true);
  };

  if (!webApp || !webApp.initDataUnsafe?.user || isPending) {
    return (
      <div className="flex h-screen max-h-screen w-full items-center justify-center overflow-y-auto overscroll-contain bg-blue-800 py-10">
        <Spinner className="mx-auto stroke-white" />
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen w-full overflow-y-auto overscroll-contain bg-blue-800">
      <div className="flex flex-col py-10 pt-15">
        <ProfileHeader profileData={data ?? ({} as IProfile)} />
        <AssignmentsCarousel onSlideClick={handleSlideClick} />
        <div className="flex flex-col gap-4">
          <AssignmentsList list={ASSIGNMENTS_LIST} />
          <AssignmentsList
            list={ASSIGNMENTS_LIST}
            type={AssignmentType.ONE_OFF}
          />
        </div>
      </div>
      <PowerUpModal
        isOpen={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};
