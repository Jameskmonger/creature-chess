import * as React from "react";

import { useSelector } from "react-redux";
import { useGameActions } from "~/networking";
import { AppState } from "~/store";

import { getPlayerMoney } from "@creature-chess/gamemode";
import { Card as CardModel } from "@creature-chess/models";

import { useGameBoards } from "../board/state";
import { CardShop as CardShop2D } from "./2d/cardShop";
import { CardShop as CardShop3D } from "./3d/cardShop";

const CARD_SHOP_TYPE: "2d" | "3d" = "2d" as "2d" | "3d";

export function CardShop() {
	const gameActions = useGameActions();

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

	const { board, bench, pieceRegistry } = useGameBoards();

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

	const CardShopStyled = CARD_SHOP_TYPE === "3d" ? CardShop3D : CardShop2D;

	return (
		<CardShopStyled
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
