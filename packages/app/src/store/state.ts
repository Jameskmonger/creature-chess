import { Overlay } from "../ui/overlay";
import { LobbyState } from "../lobby";
import { UserState } from "../menu/auth/store/reducer";
import { GameState } from "../game";
import { MenuState } from "../menu";
import { ConnectionStatus } from "../game/connection-status";

export interface AppState {
    user: UserState;

    ui: UiState;

    menu: MenuState;
    lobby: LobbyState;
    game: GameState;
}

export interface UiState {
    connectionStatus: ConnectionStatus;
    selectedPieceId: string;
    currentOverlay: Overlay | null;
    winnerName: string;
}
