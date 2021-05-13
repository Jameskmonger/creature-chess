import { LobbyState } from "../lobby";
import { GameState } from "../game";
import { MenuState } from "../menu";

export interface AppState {
	menu: MenuState;
	lobby: LobbyState;
	game: GameState;
}
