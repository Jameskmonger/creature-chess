import { createReducer } from "@reduxjs/toolkit";

import { GameEvents, PlayerCommands } from "@creature-chess/gamemode";
import { type PlayerMatchRewards } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

/**
 * Private fields that only the local Player gets.
 */
export interface LocalPlayerState {
	xp: number;
	matchRewards: PlayerMatchRewards | null;
	opponentId: string | null;
	opponentIsClone: boolean;
}

export const initialLocalPlayerState: LocalPlayerState = {
	xp: 0,
	matchRewards: null,
	opponentId: null,
	opponentIsClone: false,
};

export const localPlayerReducer = createReducer<LocalPlayerState>(
	initialLocalPlayerState,
	(builder) => {
		builder
			.addCase(
				PlayerCommands.playerInfoCommands.playerMatchRewardsEvent,
				(state, action) => {
					state.matchRewards = action.payload;
				}
			)
			.addCase(
				PlayerCommands.playerInfoCommands.updateOpponentCommand,
				(state, action) => {
					state.opponentId = action.payload.id;
					state.opponentIsClone = action.payload.isClone ?? false;
				}
			)
			.addCase(
				PlayerCommands.playerInfoCommands.updateLevelCommand,
				(state, action) => {
					state.xp = action.payload.xp;
				}
			)
			.addCase(GameEvents.gamePhaseStartedEvent, (state, action) => {
				if (action.payload.phase === GamePhase.PREPARING) {
					state.opponentId = null;
					state.opponentIsClone = false;
				}
			});
	}
);
