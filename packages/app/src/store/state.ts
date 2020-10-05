import { Card, PlayerListPlayer } from "@creature-chess/models";
import { BoardState } from "@creature-chess/shared/board";
import { BenchState } from "@creature-chess/shared/player/bench";
import { GameInfoState } from "@creature-chess/shared/player/gameInfo";
import { LevelState } from "@creature-chess/shared/player/level";
import { ConnectionStatus } from "@creature-chess/shared/networking";
import { Overlay } from "../game/overlay";
import { AuthState } from "../auth";
import { LobbyState } from "../lobby";
import { GameState } from "../game";

export interface AppState {
    auth: AuthState;
    lobby: LobbyState;

    ui: UiState;
    game: GameState;

    gameInfo: GameInfoState;
    board: BoardState;
    bench: BenchState;
    cards: Card[];
    level: LevelState;

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
