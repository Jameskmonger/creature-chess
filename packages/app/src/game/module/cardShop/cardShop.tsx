import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card as CardModel } from "@creature-chess/models";
import { getPlayerMoney, PlayerActions } from "@creature-chess/gamemode";
import { CardShop as CardShopModule } from "@creature-chess/ui";
import { AppState } from "../../../store";

const CardShop: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const cards = useSelector<AppState, CardModel[]>(state => state.game.cardShop.cards);
	const money = useSelector<AppState, number>(state => getPlayerMoney(state.game));
	const canUseShop = useSelector<AppState, boolean>(state => state.game.playerInfo.health > 0);
	const shopLocked = useSelector<AppState, boolean>(state => state.game.cardShop.locked);
	const isSpectating = useSelector<AppState, boolean>(state => state.game.spectating.id !== null);

	if (cards === null || canUseShop === false || isSpectating) {
		return null;
	}

	const onBuy = (index: number) => dispatch(PlayerActions.buyCardPlayerAction({ index }));
	const onReroll = () => dispatch(PlayerActions.rerollCardsPlayerAction());
	const onToggleLock = () => dispatch(PlayerActions.toggleShopLockPlayerAction());

	return (
		<CardShopModule
			cards={cards}
			money={money}
			isLocked={shopLocked}
			onToggleLock={onToggleLock}
			onReroll={onReroll}
			onBuy={onBuy}
		/>
	);
};

export {
	CardShop
};
