import { PageWrapper, ProfileHeader } from "@/components/common";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useGetProfile } from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";
import { useGetTasks } from "@/services/tasks/queries";

import { AssignmentsCarousel } from "./components/assignments-carousel/AssignmentsCarousel";
import { AssignmentsList } from "./components/assignments-list/AssignmentsList";
import { AssignmentType } from "./components/assignments-list/types";

export const Assignments = () => {
  const { data: tasks } = useGetTasks();
  const { data, isLoading } = useGetProfile();
  const { handleSelectionChanged } = useHapticFeedback();

  const handleSlideClick = () => {
    handleSelectionChanged();
  };

  return (
    <PageWrapper className="bg-blue-800 pb-10 pt-28" isLoading={isLoading}>
      <div className="flex flex-col">
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
    </PageWrapper>
  );
};
