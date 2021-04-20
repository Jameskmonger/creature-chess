import { Overlay } from "../game/ui/overlay";
import { LobbyState } from "../lobby";
import { UserState } from "../auth";
import { GameState } from "../game";
import { MenuState } from "../menu";
import { ConnectionStatus } from "../game/connection-status";

export interface AppState {
    user: UserState;

    menu: MenuState;
    lobby: LobbyState;
    game: GameState;
}
