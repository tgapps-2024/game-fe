import React, { FunctionComponent, PropsWithChildren } from "react";

import { OverscrollBehavior, PageWrapper } from "@/components/common";
import { HSSharedProvider } from "@/context/hs-shared-context/HSSharedContext";

export const HSRoot: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <PageWrapper
    overscrollBehaviour={OverscrollBehavior.NONE}
    disableSafeAreaInset
  >
    <HSSharedProvider>{children}</HSSharedProvider>
  </PageWrapper>
);
