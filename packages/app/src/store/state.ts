import { PlayerListPlayer } from "@creature-chess/models";
import { BoardState } from "@creature-chess/shared/board";
import { BenchState } from "@creature-chess/shared/player/bench";
import { GameInfoState } from "@creature-chess/shared/player/gameInfo";
import { ConnectionStatus } from "@creature-chess/shared/networking";
import { GameState } from "@creature-chess/shared/game";
import { Overlay } from "../ui/overlay";
import { AuthState } from "../auth";
import { LobbyState } from "../lobby";

export interface AppState {
    auth: AuthState;
    ui: UiState;

    lobby: LobbyState;
    game: GameState;

    gameInfo: GameInfoState;
    board: BoardState;
    bench: BenchState;

    playerList: PlayerListPlayer[];
}

export interface UiState {
    loading: boolean;
    debug: boolean;
    connectionStatus: ConnectionStatus;
    selectedPieceId: string;
    currentOverlay: Overlay | null;
    winnerName: string;
    mainAnnouncement: string;
    subAnnouncement: string;
    menuError: string;
}
