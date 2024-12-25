import classNames from "classnames";
import React, { FunctionComponent, ReactNode } from "react";
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
      "h-full flex flex-row justify-between items-center flex-grow px-3",
      "last:border-l last:border-solid last:border-white/10 last:pr-0"
    )}
  >
    <div className="w-full h-full flex flex-row gap-x-[9px] justify-center items-center flex-1">
      {imageNode}
      <HeaderInfo
        topComponent={topInfoComponent}
        bottomComponent={bottomInfoComponent}
      />
    </div>
  </div>
);
