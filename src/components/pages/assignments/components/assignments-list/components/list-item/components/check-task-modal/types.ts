import { ITask } from "@/services/tasks/types";

export type ModalProps = Pick<ITask, "type" | "reward" | "title"> & {
  isClicked: boolean;
  onClick: (hasVerify?: boolean) => void;
  onCheck: () => void;
};
