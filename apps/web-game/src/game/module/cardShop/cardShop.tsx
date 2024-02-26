import * as React from "react";

import { useDispatch, useSelector } from "react-redux";

import { BoardSelectors } from "@shoki/board";

import { getPlayerMoney, PlayerActions } from "@creature-chess/gamemode";
import { Card as CardModel } from "@creature-chess/models";

import { CardShop as CardShopModule } from "@cc-web/ui";

import { AppState } from "../../../store";

const CardShop: React.FunctionComponent = () => {
	const dispatch = useDispatch();

	const cards = useSelector<AppState, (CardModel | null)[]>(
		(state) => state.game.cardShop.cards
	);
	const money = useSelector<AppState, number>((state) =>
		getPlayerMoney(state.game)
	);
	const canUseShop = useSelector<AppState, boolean>(
		(state) => state.game.playerInfo.health > 0
	);
	const shopLocked = useSelector<AppState, boolean>(
		(state) => state.game.cardShop.locked
	);
	const isSpectating = useSelector<AppState, boolean>(
		(state) => state.game.spectating.id !== null
	);

	const ownedDefinitionIds = useSelector<AppState, number[]>((state) => [
		...BoardSelectors.getAllPieces(state.game.board).map(
			(piece) => piece.definitionId
		),
		...BoardSelectors.getAllPieces(state.game.bench).map(
			(piece) => piece.definitionId
		),
	]);

	if (cards === null || canUseShop === false || isSpectating) {
		return null;
	}

	const onBuy = (index: number) =>
		dispatch(PlayerActions.buyCardPlayerAction({ index }));
	const onReroll = () => dispatch(PlayerActions.rerollCardsPlayerAction());
	const onToggleLock = () =>
		dispatch(PlayerActions.toggleShopLockPlayerAction());

	return (
		<CardShopModule
			cards={cards}
			ownedDefinitionIds={ownedDefinitionIds}
			money={money}
			isLocked={shopLocked}
			onToggleLock={onToggleLock}
			onReroll={onReroll}
			onBuy={onBuy}
		/>
	);
};

export { CardShop };
