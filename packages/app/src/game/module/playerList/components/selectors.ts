import { createSelector } from "reselect";
import { AppState } from "../../../../store";

const getPlayers = (state: AppState) => state.game.playerList;

export const getPlayerById = (id: string) => createSelector(
	getPlayers,
	players => players.find(p => p.id === id) || null
);
