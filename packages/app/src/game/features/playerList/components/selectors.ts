import { createSelector } from "reselect";
import { AppState } from "../../../../store";

const getPlayers = (state: AppState) => state.playerList;

export const getPlayerById = (id: string) => {
  return createSelector(
    getPlayers,
    players => players.find(p => p.id === id) || null
  );
};
