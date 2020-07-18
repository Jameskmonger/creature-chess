import { LobbyPlayer, Card, PlayerListPlayer, GamePhase } from "@common/models";
import { ConnectionStatus } from "@common/networking";
import { BoardState } from "@common/board";
import { BenchState } from "@common/player/bench";
import { Overlay } from "@app/overlay";
import { GameInfoState } from "@common/player/gameInfo";

export interface AppState {
    auth: AuthState | null;

    gameInfo: GameInfoState;
    board: BoardState;
    bench: BenchState;
    cards: Card[];

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
    reconnectionSecret: string;

    name: string;
    level: number;
    xp: number;
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
