import React, {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
} from "react";

import classNames from "classnames";

import { Spinner } from "@/components/common";
import { useTelegram } from "@/context";
import { getTgSafeAreaInsetTop } from "@/utils/telegram";

import { PAGE_WRAPPER_ID as PAGE_WRAPPER_INTERNAL_ID } from "./constants";

export { PAGE_WRAPPER_INTERNAL_ID as PAGE_WRAPPER_ID };

export enum OverscrollBehavior {
  CONTAIN = "contain",
  NONE = "none",
}

type Props = {
  isLoading?: boolean;
  disableSafeAreaInset?: boolean;
  skeleton?: ReactNode;
  overscrollBehaviour?: OverscrollBehavior;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const PageWrapper: FunctionComponent<Props> = ({
  children,
  className,
  isLoading,
  skeleton,
  overscrollBehaviour = OverscrollBehavior.CONTAIN,
  disableSafeAreaInset = false,
  ...props
}) => {
  const { webApp, isAuthenticating } = useTelegram();

  if (!webApp?.initDataUnsafe?.user || isAuthenticating || isLoading) {
    return (
      <div
        className={classNames(
          "flex h-screen max-h-screen w-full justify-center bg-blue-800",
          { "items-center": !skeleton },
        )}
      >
        {skeleton ? skeleton : <Spinner className="mx-auto stroke-white" />}
      </div>
    );
  }

  const insetTop = getTgSafeAreaInsetTop(webApp);

  return (
    <div
      id={PAGE_WRAPPER_INTERNAL_ID}
      className={classNames(
        "h-screen max-h-screen w-full overflow-y-auto",
        {
          "overscroll-contain":
            overscrollBehaviour === OverscrollBehavior.CONTAIN,
          "overscroll-none": overscrollBehaviour === OverscrollBehavior.NONE,
        },
        className,
      )}
      style={
        !disableSafeAreaInset && insetTop ? { paddingTop: insetTop } : undefined
      }
      {...props}
    >
      {children}
    </div>
  );
};
