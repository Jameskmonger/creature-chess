import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { REROLL_COST } from "@creature-chess/models";
import { getPlayerMoney, PlayerActions } from "@creature-chess/gamemode";
import { AppState } from "../../../../store";

const RerollButton: React.FunctionComponent<{ afterReroll: () => void }> = ({ afterReroll }) => {
	const dispatch = useDispatch();
	const money = useSelector<AppState, number>(state => getPlayerMoney(state.game));

	const buyable = money >= REROLL_COST;
	const onBuy = () => {
		dispatch(PlayerActions.rerollCardsPlayerAction());
		afterReroll();
	};

	return (
		<button className="reroll shop-action" onClick={buyable ? onBuy : undefined} disabled={buyable === false}>
			New Cards (${REROLL_COST})
		</button>
	);
};

export { RerollButton };
