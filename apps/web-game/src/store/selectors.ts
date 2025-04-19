import { createSelector } from "reselect";

import { AppState } from "./state";

const getPlayers = (state: AppState) => state.game.playerList;

export const getPlayerById = (id: string) =>
	createSelector(
		getPlayers,
		(players) => players.find((p) => p.id === id) || null
	);
