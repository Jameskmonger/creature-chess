import { GamePhase, Models } from "@common";
import { FeedMessage } from "@common/feed-message";
import { LobbyPlayer } from '@common/models';

export interface GameState {
    gameId: string;
    phase: GamePhase;
    phaseTimer: number;
    opponentId: string;
    loading: boolean;
    menuError: string;
    money: number;
    round: number | null;
    debug: boolean;

    mainAnnouncement: string;
    subAnnouncement: string;

    selectedPiece: Models.Piece;
}

export interface LocalPlayerState {
    id: string;
    name: string;
    level: number;
    xp: number;
    ready: boolean;
}

export interface AppState {
    board: Models.Piece[];
    bench: Models.Piece[];
    game: GameState;
    playerList: Models.PlayerListPlayer[];
    cards: Models.Card[];
    localPlayer: LocalPlayerState;
    feedMessages: FeedMessage[];
    lobby: LobbyState;
}

export interface LobbyState {
    localPlayerId: string;
    lobbyId: string;
    players: LobbyPlayer[];
    secondsRemaining: number;
    isHost: boolean;
}