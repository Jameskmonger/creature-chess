import * as React from "react";

interface BalanceDisplayProps {
  value: number;
}

const BalanceDisplay: React.FunctionComponent<BalanceDisplayProps> = ({ value }) => {
  return (
    <>
      <span className="item">Balance</span>
      <span className="item">${value}</span>
    </>
  );
};

export { BalanceDisplay };
