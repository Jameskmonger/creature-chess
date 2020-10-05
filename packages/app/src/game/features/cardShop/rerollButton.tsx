import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { REROLL_COST } from "@creature-chess/models/src/constants";
import { rerollCards } from "@creature-chess/shared/player/actions";
import { getPlayerMoney } from "@creature-chess/shared/player/playerSelectors";
import { AppState } from "../../../store";

const RerollButton: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const money = useSelector<AppState, number>(getPlayerMoney);

  const buyable = money >= REROLL_COST;
  const onBuy = () => dispatch(rerollCards());

  return (
    <button className="reroll shop-action" onClick={buyable ? onBuy : undefined} disabled={buyable === false}>
      New Cards (${REROLL_COST})
    </button>
  );
};

export { RerollButton };
