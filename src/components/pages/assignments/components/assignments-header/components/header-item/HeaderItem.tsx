import { FunctionComponent, ReactNode } from "react";

import classNames from "classnames";

import { HeaderInfo } from "../header-info/HeaderInfo";

type Props = {
  topInfoComponent: ReactNode;
  bottomInfoComponent: ReactNode;
  imageNode: ReactNode;
};

export const HeaderItem: FunctionComponent<Props> = ({
  topInfoComponent,
  bottomInfoComponent,
  imageNode,
}) => (
  <div
    className={classNames(
      "flex h-full flex-grow flex-row items-center justify-between px-3",
      "last:border-l last:border-solid last:border-white/10 last:pr-0",
    )}
  >
    <div className="flex h-full w-full flex-1 flex-row items-center justify-center gap-x-[9px]">
      {imageNode}
      <HeaderInfo
        topComponent={topInfoComponent}
        bottomComponent={bottomInfoComponent}
      />
    </div>
  </div>
);
