import * as React from "react";

interface RerollButtonProps {
  buyable: boolean;
  cost: number;
  onBuy: () => void;
}

const RerollButton: React.FunctionComponent<RerollButtonProps> = ({ buyable, cost, onBuy }) => {
  return (
    <button className="reroll shop-action" onClick={buyable ? onBuy : undefined} disabled={buyable === false}>
      New Cards (${cost})
    </button>
  );
};

export { RerollButton };
