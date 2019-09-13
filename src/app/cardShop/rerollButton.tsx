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
        <FaSyncAlt
          onClick={buyable ? onBuy : undefined}
          className={`reroll-icon${buyable ? "" : " not-buyable"}`}
        />
      </span>
      <span className="item">(${cost})</span>
    </>
  );
};

export { RerollButton }
