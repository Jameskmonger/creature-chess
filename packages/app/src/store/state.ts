import { LobbyPlayer, Card, PlayerListPlayer, GamePhase } from "@creature-chess/shared/models";
import { ConnectionStatus } from "@creature-chess/shared/networking";
import { BoardState } from "@creature-chess/shared/board";
import { BenchState } from "@creature-chess/shared/player/bench";
import { Overlay } from "../overlay";
import { GameInfoState } from "@creature-chess/shared/player/gameInfo";
import { LevelState } from "@creature-chess/shared/player/level";

export interface AppState {
    auth: AuthState | null;

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

export interface AuthState {
    authenticated: boolean;
    idToken: string;
    profile: {
        nickname?: {
            value: string;
            uppercase: string;
        };
    };
    expiresAt: number;
}

export interface GameState {
    gameId: string;
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

    name: string;
    ready: boolean;
}

export interface LobbyState {
    localPlayerId: string;
    lobbyId: string;
    players: LobbyPlayer[];
    startingAtMs: number;
    isHost: boolean;
    requestNicknameMessage: string;
}

export interface GameOverInfoState {
    winnerName: string;
}

export interface UiState {
    currentOverlay: Overlay | null;
}
