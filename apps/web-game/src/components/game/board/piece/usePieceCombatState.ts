import { useCallback, useSyncExternalStore } from "react";

import { PieceCombatState } from "@creature-chess/battle";

import { useGameSession } from "~/game/sessionContext";

export const usePieceCombatState = (
	pieceId: string
): PieceCombatState | null => {
	const { battle } = useGameSession();

	const getSnapshot = useCallback((): PieceCombatState | null => {
		try {
			return battle.combatStore.getPiece(pieceId);
		} catch {
			return null;
		}
	}, [battle, pieceId]);

	return useSyncExternalStore(battle.combatStore.subscribe, getSnapshot);
};
