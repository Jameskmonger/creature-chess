import { GameState } from "./game/state";
import { LobbyState } from "./lobby/state";
import { MenuState } from "./menu/state";

export type AppState = {
	lobby: LobbyState;
	game: GameState;
	menu: MenuState;
};
