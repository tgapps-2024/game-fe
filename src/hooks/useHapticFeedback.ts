import { useTelegram } from "@/context";
import { NotificationEnum } from "@/types/telegram";

export const useHapticFeedback = () => {
  const { webApp } = useTelegram();

  const handleSelectionChanged = () => {
    if (webApp) {
      webApp.HapticFeedback.selectionChanged();
    }
  };

  const handleNotificationOccurred = (type: NotificationEnum) => {
    if (webApp) {
      webApp.HapticFeedback.notificationOccurred(type);
    }
  };

  return {
    handleSelectionChanged,
    handleNotificationOccurred,
  };
};
