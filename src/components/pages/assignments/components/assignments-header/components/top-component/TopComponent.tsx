import React, { FunctionComponent } from "react";

type Props = {
  text: string;
};

export const TopComponent: FunctionComponent<Props> = ({ text }) => {
  return (
    <p className="text-x text-white font-rubik font-medium text-stroke-half text-shadow-sm">
      {text}
    </p>
  );
};
