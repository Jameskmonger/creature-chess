import { PlayerListPlayer } from "@creature-chess/models";
import { BoardState, BenchState, PlayerInfoState, GameState, ConnectionStatus } from "@creature-chess/shared";
import { Overlay } from "../ui/overlay";
import { AuthState } from "../auth";
import { LobbyState } from "../lobby";

export interface AppState {
    auth: AuthState;
    ui: UiState;

    lobby: LobbyState;
    game: GameState;

    playerInfo: PlayerInfoState;
    board: BoardState;
    bench: BenchState;

    playerList: PlayerListPlayer[];
}

export interface UiState {
    loading: boolean;
    connectionStatus: ConnectionStatus;
    selectedPieceId: string;
    currentOverlay: Overlay | null;
    winnerName: string;
    mainAnnouncement: string;
    subAnnouncement: string;
    menuError: string;
}
