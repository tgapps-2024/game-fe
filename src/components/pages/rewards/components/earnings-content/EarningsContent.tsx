import React from "react";

type Props = {
  isActive: boolean;
};

export const EarningsContent = ({ isActive }: Props) => {
  return (
    <div className="mx-4">
      EarningsContent - {isActive ? "active" : "inactive"}
    </div>
  );
};
