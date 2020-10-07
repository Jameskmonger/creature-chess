import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { REROLL_COST } from "@creature-chess/models";
import { PlayerActions, getPlayerMoney } from "@creature-chess/shared";
import { AppState } from "../../../store";

const RerollButton: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const money = useSelector<AppState, number>(getPlayerMoney);

  const buyable = money >= REROLL_COST;
  const onBuy = () => dispatch(PlayerActions.rerollCards());

  return (
    <button className="reroll shop-action" onClick={buyable ? onBuy : undefined} disabled={buyable === false}>
      New Cards (${REROLL_COST})
    </button>
  );
};

export { RerollButton };
