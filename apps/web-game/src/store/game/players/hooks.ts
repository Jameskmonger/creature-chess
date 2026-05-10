import { useSelector } from "react-redux";

import { useAccountId } from "~/auth/context";
import { AppState } from "~/store";

import { type PlayerMatchRewards } from "@creature-chess/gamemode";

import { Player } from "./state";
import { useMemo } from "react";

export function useGamePlayer(id: string | null): Player | undefined {
	return useSelector((state: AppState) =>
		id ? state.game.players.find((p) => p.id === id) : undefined
	);
}

export function usePlayerRank(id: string): number {
	return useSelector(
		(state: AppState) =>
			state.game.players.findIndex((p) => p.id === id) + 1
	);
}

export type LocalPlayer = Player & {
	xp: number;
	matchRewards: PlayerMatchRewards | null;
	opponentId: string | null;
	opponentIsClone: boolean;
};

/**
 * The local Player joined with the local-only extras (xp, matchRewards,
 * opponentId, opponentIsClone). Returns null until the first
 * playerListChangedEvent arrives.
 */
export function useLocalPlayer(): LocalPlayer | null {
	const accountId = useAccountId();
	const player = useGamePlayer(accountId);
	const extras = useSelector((state: AppState) => ({
		xp: state.game.localPlayer.xp,
		matchRewards: state.game.localPlayer.matchRewards,
		opponentId: state.game.localPlayer.opponentId,
		opponentIsClone: state.game.localPlayer.opponentIsClone,
	}));

	const result = useMemo(() => {
		if (!player) {
			return null;
		}

		return { ...player, ...extras };
	}, [player, extras]);

	return result;
}

export function useOpponentPlayer(): Player | undefined {
	const opponentId = useSelector(
		(state: AppState) => state.game.localPlayer.opponentId
	);
	return useGamePlayer(opponentId);
}
