import * as React from "react";
import { FaSyncAlt } from "react-icons/fa";

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

export { RerollButton }
