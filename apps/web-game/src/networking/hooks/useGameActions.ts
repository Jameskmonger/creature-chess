import { useMemo } from "react";

import { PlayerActions } from "@creature-chess/models";
import { useDispatch } from "react-redux";

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
		}),
		[dispatch]
	);
}
