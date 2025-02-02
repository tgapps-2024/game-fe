import React from "react";

type Props = {
  isActive: boolean;
};

export const BoosterContent = ({ isActive }: Props) => {
  return (
    <div className="mx-4">
      BoosterContent - {isActive ? "active" : "inactive"}
    </div>
  );
};
