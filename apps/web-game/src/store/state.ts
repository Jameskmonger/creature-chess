import { LobbyState } from "../lobby";
import { GameState } from "../game";

export interface AppState {
	lobby: LobbyState;
	game: GameState;
}
