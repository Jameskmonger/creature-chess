import * as React from "react";

interface RerollButtonProps {
  buyable: boolean;
  cost: number;
  onBuy: () => void;
}

const RerollButton: React.FunctionComponent<RerollButtonProps> = ({ buyable, cost, onBuy }) => {
  return (
    <>
      <span className="item">
        <button className="reroll" onClick={buyable ? onBuy : undefined} disabled={buyable === false}>
          New Cards (${cost})
        </button>
      </span>
    </>
  );
};

export { RerollButton };
