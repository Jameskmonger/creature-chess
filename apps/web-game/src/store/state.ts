import { LobbyState } from "../../lobby";
import { GameState } from "../game";

export type AppState = {
	lobby: LobbyState;
	game: GameState;
};
