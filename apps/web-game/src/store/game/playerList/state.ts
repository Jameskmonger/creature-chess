import { createReducer } from "@reduxjs/toolkit";

import { GameEvents } from "@creature-chess/gamemode";
import { PlayerListPlayer } from "@creature-chess/models";

const initialState: PlayerListPlayer[] = [];

export const playerListReducer = createReducer<PlayerListPlayer[]>(
	initialState,
	(builder) => {
		builder.addCase(GameEvents.playerListChangedEvent, (_state, action) => [
			...action.payload.players,
		]);
	}
);
