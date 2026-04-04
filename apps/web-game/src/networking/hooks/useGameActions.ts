import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";

import { PlayerActions, type PlayerAction } from "@creature-chess/gamemode";
import { QuickChatOption } from "@creature-chess/models";

import { useGameConnectionRef } from "../connectionRef";

export function useGameActions() {
	const dispatch = useDispatch();
	const gameConnection = useGameConnectionRef();

	const sendAction = useCallback(
		(action: PlayerAction) => {
			dispatch(action);
			gameConnection?.sendPlayerAction(action);
		},
		[dispatch, gameConnection],
	);

	return useMemo(
		() => ({
			buyXp: () => sendAction(PlayerActions.buyXpPlayerAction()),
			buyCard: (index: number) =>
				sendAction(PlayerActions.buyCardPlayerAction({ index })),
			rerollCards: () => sendAction(PlayerActions.rerollCardsPlayerAction()),
			toggleShopLock: () =>
				sendAction(PlayerActions.toggleShopLockPlayerAction()),
			sellPiece: (pieceId: string) =>
				sendAction(PlayerActions.sellPiecePlayerAction({ pieceId })),
			readyUp: () => sendAction(PlayerActions.readyUpPlayerAction()),
			quitGame: () => sendAction(PlayerActions.quitGamePlayerAction()),
			spectate: (playerId: string | null) =>
				sendAction(PlayerActions.spectatePlayerAction({ playerId })),
			quickChat: (sendingPlayerId: string | null, chatValue: QuickChatOption) =>
				sendAction(PlayerActions.quickChatPlayerAction({ sendingPlayerId, chatValue })),
		}),
		[sendAction],
	);
}
