import { AppState } from "../store/store";

export const loadingSelector = (state: AppState) => state.game.loading;
export const localPlayerIdSelector = (state: AppState) => state.game.localPlayerId;
