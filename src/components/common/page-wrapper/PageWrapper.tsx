import React, {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
} from "react";

import classNames from "classnames";

import { Spinner } from "@/components/common";
import { useTelegram } from "@/context";

type Props = {
  isLoading?: boolean;
  disableSafeAreaInset?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const PageWrapper: FunctionComponent<Props> = ({
  children,
  className,
  isLoading,
  disableSafeAreaInset = false,
  ...props
}) => {
  const { webApp } = useTelegram();

  if (!webApp || !webApp.initDataUnsafe?.user || isLoading) {
    return (
      <div className="flex h-screen max-h-screen w-full items-center justify-center bg-blue-800">
        <Spinner className="mx-auto stroke-white" />
      </div>
    );
  }

  const { safeAreaInset, contentSafeAreaInset } = webApp;
  const insetTop = safeAreaInset.top + contentSafeAreaInset.top;

  return (
    <div
      className={classNames(
        "h-screen max-h-screen w-full overflow-y-auto overscroll-contain",
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
