import { FunctionComponent, useState } from "react";

import { useTranslations } from "next-intl";

import { ConfirmationModal } from "@/components/common";
import { NS } from "@/constants/ns";
import { useHapticFeedback } from "@/hooks/useHapticFeedback";
import { ITask } from "@/services/tasks/types";

import { ListItem } from "./components/list-item/ListItem";
import { AssignmentType } from "./types";

type Props = {
  type?: AssignmentType;
  list: ITask[];
};

export const AssignmentsList: FunctionComponent<Props> = ({
  type = AssignmentType.DAILY,
  list,
}) => {
  const t = useTranslations(NS.PAGES.ASSIGNMENTS.ROOT);
  const [isSecondaryModalOpen, setIsSecondaryModalOpen] = useState(false);
  const { handleSelectionChanged } = useHapticFeedback();

  const handleConfirmationModalOpen = () => {
    handleSelectionChanged();
    setIsSecondaryModalOpen(true);
  };

  return (
    <>
      <div className="mt-6 flex flex-col gap-4 px-4">
        <div className="flex items-center justify-between">
          <div className="text-nowrap text-2xl font-black leading-none tracking-[0.04em] text-white">
            {t(`${NS.PAGES.ASSIGNMENTS.TYPES.ROOT}.${type}`)}
          </div>
          <div className="text-nowrap rounded-[20px] bg-blue-700 px-3 py-1 text-xs font-black tracking-[0.04em] text-white">
            {list.length}
          </div>
        </div>
        <ul className="rounded-[18px] border border-solid border-white/10 bg-blue-700 px-4 py-3">
          {list.map((item) => (
            <ListItem key={item.id} {...item} />
          ))}
        </ul>
      </div>

      <ConfirmationModal
        isOpen={isSecondaryModalOpen}
        onClose={handleConfirmationModalOpen}
      />
    </>
  );
};
