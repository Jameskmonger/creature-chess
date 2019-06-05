import { GamePhase, Models } from "@common";
import { FeedMessage } from "@common/feed-message";

export interface GameState {
    gameId: string;
    phase: GamePhase;
    phaseTimer: number;
    opponentId: string;
    loading: boolean;
    lobbyError: string;
    money: number;
    round: number | null;
    debug: boolean;
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
    evolutionLocked: boolean;
    game: GameState;
    playerList: Models.PlayerListPlayer[];
    cards: Models.Card[];
    localPlayer: LocalPlayerState;
    feedMessages: FeedMessage[];
}
