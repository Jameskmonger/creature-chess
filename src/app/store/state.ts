import { LobbyPlayer, FeedMessage, Card, PlayerListPlayer, GamePhase, Piece } from "@common/models";
import { ConnectionStatus } from "@common/networking";
import { BoardState } from "@common/board";
import { BenchState } from "@common/player/bench";

export interface GameState {
    gameId: string;
    phase: GamePhase;
    phaseStartedAtSeconds: number;
    opponentId: string;
    loading: boolean;
    menuError: string;
    money: number;
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

export interface AppState {
    board: BoardState;
    bench: BenchState;
    game: GameState;
    playerList: PlayerListPlayer[];
    cards: Card[];
    localPlayer: LocalPlayerState;
    feedMessages: FeedMessage[];
    lobby: LobbyState;
}

export interface LobbyState {
    localPlayerId: string;
    lobbyId: string;
    players: LobbyPlayer[];
    startingAtMs: number;
    isHost: boolean;
}

export interface GameOverInfoState {
    winnerName: string;
}
