import { useCallback, useSyncExternalStore } from "react";

import { PieceCombatState } from "@creature-chess/battle";

import { useGameSession } from "~/game/sessionContext";

export const usePieceCombatState = (
	pieceId: string
): PieceCombatState | null => {
	const { combatStore } = useGameSession();

	const getSnapshot = useCallback((): PieceCombatState | null => {
		try {
			return combatStore.getPiece(pieceId);
		} catch {
			return null;
		}
	}, [combatStore, pieceId]);

	return useSyncExternalStore(combatStore.subscribe, getSnapshot);
};
