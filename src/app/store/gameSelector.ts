import { AppState } from "./state";

export const loadingSelector = (state: AppState) => state.game.loading;
export const localPlayerIdSelector = (state: AppState) => state.localPlayer.id;
export const opponentIdSelector = (state: AppState) => state.game.opponentId;
