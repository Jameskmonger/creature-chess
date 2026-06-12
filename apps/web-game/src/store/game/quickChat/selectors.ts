import { AppState } from "~/store";

export const selectPlayerQuickChat = (playerId: string) => (state: AppState) =>
	state.game.quickChat[playerId];
