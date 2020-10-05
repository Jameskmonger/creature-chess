import { LobbyPlayer, Card, PlayerListPlayer, GamePhase } from "@creature-chess/models";
import { ConnectionStatus } from "@creature-chess/shared/networking";
import { BoardState } from "@creature-chess/shared/board";
import { BenchState } from "@creature-chess/shared/player/bench";
import { Overlay } from "../overlay";
import { GameInfoState } from "@creature-chess/shared/player/gameInfo";
import { LevelState } from "@creature-chess/shared/player/level";
import { AuthState } from "../auth";

export interface AppState {
    auth: AuthState;

    gameInfo: GameInfoState;
    board: BoardState;
    bench: BenchState;
    cards: Card[];
    level: LevelState;

    game: GameState;
    playerList: PlayerListPlayer[];
    localPlayer: LocalPlayerState;
    lobby: LobbyState;
    ui: UiState;
}

export interface GameState {
    phase: GamePhase;
    phaseStartedAtSeconds: number;
    opponentId: string;
    loading: boolean;
    menuError: string;
    round: number | null;
    debug: boolean;
    connectionStatus: ConnectionStatus;

    mainAnnouncement: string;
    subAnnouncement: string;

    selectedPieceId: string;
    shopLocked: boolean;

    winnerName: string;
}

export interface LocalPlayerState {
    id: string;

    ready: boolean;
}

export interface LobbyState {
    localPlayerId: string;
    lobbyId: string;
    players: LobbyPlayer[];
    startingAtMs: number;
    requestNicknameMessage: string;
}

export interface GameOverInfoState {
    winnerName: string;
}

export interface UiState {
    currentOverlay: Overlay | null;
}
