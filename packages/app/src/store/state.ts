import { LobbyPlayer, Card, PlayerListPlayer, GamePhase } from "@creature-chess/models";
import { ConnectionStatus } from "@creature-chess/shared/networking";
import { BoardState } from "@creature-chess/shared/board";
import { BenchState } from "@creature-chess/shared/player/bench";
import { Overlay } from "../game/overlay";
import { GameInfoState } from "@creature-chess/shared/player/gameInfo";
import { LevelState } from "@creature-chess/shared/player/level";
import { AuthState } from "../auth";
import { LobbyState } from "../lobby";

export interface AppState {
    auth: AuthState;
    ui: UiState;
    lobby: LobbyState;

    gameInfo: GameInfoState;
    board: BoardState;
    bench: BenchState;
    cards: Card[];
    level: LevelState;

    game: GameState;
    playerList: PlayerListPlayer[];
    localPlayer: LocalPlayerState;
}

export interface GameState {
    phase: GamePhase;
    phaseStartedAtSeconds: number;
    opponentId: string;
    loading: boolean;
    round: number | null;
    debug: boolean;
    connectionStatus: ConnectionStatus;
    shopLocked: boolean;
}

export interface LocalPlayerState {
    id: string;

    ready: boolean;
}

export interface UiState {
    selectedPieceId: string;
    currentOverlay: Overlay | null;
    winnerName: string;
    mainAnnouncement: string;
    subAnnouncement: string;
    menuError: string;
}
