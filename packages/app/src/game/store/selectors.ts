import { AppState } from "../../store/state";

export const loadingSelector = (state: AppState) => state.game.loading;
