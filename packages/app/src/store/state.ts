import { Overlay } from "../ui/overlay";
import { LobbyState } from "../lobby";
import { UserState } from "../menu/auth/store/reducer";
import { ConnectionStatus } from "../networking";
import { GameState } from "../game";

export interface AppState {
    user: UserState;

    ui: UiState;

    lobby: LobbyState;
    game: GameState;
}

export interface UiState {
    loading: boolean;
    connectionStatus: ConnectionStatus;
    selectedPieceId: string;
    currentOverlay: Overlay | null;
    winnerName: string;
    menuError: string;
}
