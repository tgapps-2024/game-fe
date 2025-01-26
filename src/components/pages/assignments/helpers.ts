import { ITask, TaskStatus } from "@/services/tasks/types";

export function sortTasks(tasks: ITask[]): ITask[] {
  return tasks.sort((a, b) => {
    if (
      a.status === TaskStatus.COMPLETED &&
      b.status !== TaskStatus.COMPLETED
    ) {
      return 1;
    } else if (
      a.status !== TaskStatus.COMPLETED &&
      b.status === TaskStatus.COMPLETED
    ) {
      return -1;
    } else {
      return 0;
    }
  });
}
