import { AssignmentsCarousel } from "./components/assignments-carousel/AssignmentsCarousel";
import { AssignmentsHeader } from "./components/assignments-header/AssignmentsHeader";
import { AssignmentsList } from "./components/assignments-list/AssignmentsList";
import { ASSIGNMENTS_LIST } from "./constants";

export const Assignments = () => {
  return (
    //TODO: investigate why scroll doesn't work
    <div className="h-screen max-h-screen w-full overflow-y-auto overscroll-contain bg-blue-800 py-10">
      <div className="flex flex-col">
        <AssignmentsHeader />
        <AssignmentsCarousel />
        <div className="flex flex-col gap-4">
          <AssignmentsList list={ASSIGNMENTS_LIST} />
        </div>
      </div>
    </div>
  );
};
