import React, { FunctionComponent } from "react";

type Props = {
  text: string;
};

export const TopComponent: FunctionComponent<Props> = ({ text }) => {
  return (
    <p className="font-inter text-xs font-medium text-gray-550 text-shadow-sm">
      {text}
    </p>
  );
};
