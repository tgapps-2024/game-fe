import { PageWrapper, ProfileHeader } from "@/components/common";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { useGetProfile } from "@/services/profile/queries";
import { IProfile } from "@/services/profile/types";
import { useGetTasks } from "@/services/tasks/queries";

import { AssignmentsCarousel } from "./components/assignments-carousel/AssignmentsCarousel";
import { AssignmentsList } from "./components/assignments-list/AssignmentsList";
import { AssignmentType } from "./components/assignments-list/types";
import { sortTasks } from "./helpers";

export const Assignments = () => {
  const { data: tasks, isLoading: isTasksLoading } = useGetTasks();
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();
  const { handleSelectionChanged } = useHapticFeedback();

  const handleSlideClick = () => {
    handleSelectionChanged();
  };

  return (
    <PageWrapper className="bg-blue-800 pb-10 pt-4">
      <div className="flex flex-col">
        <ProfileHeader
          isLoading={isProfileLoading}
          profileData={profile ?? ({} as IProfile)}
        />
        <AssignmentsCarousel onSlideClick={handleSlideClick} />
        <div className="flex flex-col gap-4">
          <AssignmentsList
            isLoading={isTasksLoading}
            list={sortTasks(tasks?.everyday || [])}
          />
          <AssignmentsList
            isLoading={isTasksLoading}
            list={sortTasks(tasks?.other || [])}
            type={AssignmentType.ONE_OFF}
          />
        </div>
      </div>
    </PageWrapper>
  );
};
