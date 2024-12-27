import { ReactNode } from "react";

import { MainModal } from "./components/main-modal/MainModal";

type BackgroundMapType = {
  [key: number]: ReactNode;
};

export const MAP_MODALS_CONTENT: BackgroundMapType = {
  0: <MainModal />,
  1: <MainModal />,
  2: <MainModal />,
  3: <MainModal />,
  4: <MainModal />,
};
