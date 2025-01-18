import { createElement } from "react";

import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import DestructiveSvg from "@/public/assets/svg/toast/destructive.svg";
import DoneSvg from "@/public/assets/svg/toast/done.svg";
import WarningSvg from "@/public/assets/svg/toast/warning.svg";

const MAP_ICONS_BY_TYPE = {
  destructive: DestructiveSvg,
  done: DoneSvg,
  warning: WarningSvg,
  default: WarningSvg,
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}

              <ToastDescription>
                <div className="flex size-4 items-center justify-center">
                  {props.variant &&
                    createElement(MAP_ICONS_BY_TYPE[props.variant])}
                </div>
                {description}
              </ToastDescription>
            </div>
            {action}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
