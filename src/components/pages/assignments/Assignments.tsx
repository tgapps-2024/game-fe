// import { useState } from "react";

import { ProfileHeader } from "@/components/common";
import { Spinner } from "@/components/common/spinner/Spinner";
import { useTelegram } from "@/context";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useGetProfile } from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";
import { useGetTasks } from "@/services/tasks/queries";

import { AssignmentsCarousel } from "./components/assignments-carousel/AssignmentsCarousel";
import { AssignmentsList } from "./components/assignments-list/AssignmentsList";
import { AssignmentType } from "./components/assignments-list/types";

export const Assignments = () => {
  const { webApp } = useTelegram();
  const { data: tasks } = useGetTasks();
  const { data, isLoading } = useGetProfile();
  const { handleSelectionChanged } = useHapticFeedback();

  const handleSlideClick = () => {
    handleSelectionChanged();
  };

  if (!webApp || !webApp.initDataUnsafe?.user || isLoading) {
    return (
      <div className="flex h-screen max-h-screen w-full items-center justify-center overflow-y-auto overscroll-contain bg-blue-800 py-10">
        <Spinner className="mx-auto stroke-white" />
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen w-full overflow-y-auto overscroll-contain bg-blue-800">
      <div className="flex flex-col py-10 pt-28">
        <ProfileHeader profileData={data ?? ({} as IProfile)} />
        <AssignmentsCarousel onSlideClick={handleSlideClick} />
        <div className="flex flex-col gap-4">
          <AssignmentsList list={tasks?.everyday || []} />
          <AssignmentsList
            list={tasks?.other || []}
            type={AssignmentType.ONE_OFF}
          />
        </div>
      </div>
    </div>
  );
};
