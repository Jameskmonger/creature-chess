import * as React from "react";

import { useSelector } from "react-redux";
import { useGameActions } from "~/networking";
import { AppState } from "~/store";

import { Card as CardModel } from "@creature-chess/models";

import { useGameSession } from "~/game/sessionContext";
import { CardShopPresentation } from "./presentation/cardShop";

export function CardShop() {
	const gameActions = useGameActions();

	const cards = useSelector<AppState, (CardModel | null)[]>(
		(state) => state.game.cardShop.cards
	);
	const money = useSelector<AppState, number>(
		(state) => state.game.playerInfo.money
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

	const { board, bench, pieceRegistry } = useGameSession();

	const ownedDefinitionIds = React.useMemo(
		() => [
			...board
				.getAllPieces()
				.map((piece) => pieceRegistry.getPieceById(piece.id)!.definitionId),
			...bench
				.getAllPieces()
				.map((piece) => pieceRegistry.getPieceById(piece.id)!.definitionId),
		],
		[board, bench, pieceRegistry]
	);

	const onBuy = React.useCallback(
		(index: number) => gameActions.buyCard(index),
		[gameActions]
	);

	if (cards === null || canUseShop === false || isSpectating) {
		return null;
	}

	return (
		<CardShopPresentation
			cards={cards}
			ownedDefinitionIds={ownedDefinitionIds}
			money={money}
			isLocked={shopLocked}
			onToggleLock={gameActions.toggleShopLock}
			onReroll={gameActions.rerollCards}
			onBuy={onBuy}
		/>
	);
}
