import { useMemo } from "react";

import { useDispatch } from "react-redux";

import { PlayerActions } from "@creature-chess/gamemode";
import { QuickChatOption } from "@creature-chess/models";

export function useGameActions() {
	const dispatch = useDispatch();

	return useMemo(
		() => ({
			buyXp: () => dispatch(PlayerActions.buyXpPlayerAction()),
			buyCard: (index: number) =>
				dispatch(PlayerActions.buyCardPlayerAction({ index })),
			rerollCards: () => dispatch(PlayerActions.rerollCardsPlayerAction()),
			toggleShopLock: () =>
				dispatch(PlayerActions.toggleShopLockPlayerAction()),
			sellPiece: (pieceId: string) =>
				dispatch(PlayerActions.sellPiecePlayerAction({ pieceId })),
			readyUp: () => dispatch(PlayerActions.readyUpPlayerAction()),
			quitGame: () => dispatch(PlayerActions.quitGamePlayerAction()),
			spectate: (playerId: string | null) =>
				dispatch(PlayerActions.spectatePlayerAction({ playerId })),
			quickChat: (sendingPlayerId: string | null, chatValue: QuickChatOption) =>
				dispatch(
					PlayerActions.quickChatPlayerAction({ sendingPlayerId, chatValue })
				),
		}),
		[dispatch]
	);
}
