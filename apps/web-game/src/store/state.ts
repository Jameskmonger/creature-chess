import { GameState } from "./game/state";
import { LobbyState } from "./lobby/state";

export type AppState = {
	lobby: LobbyState;
	game: GameState;
};
