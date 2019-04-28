export enum GameState {
    WAITING,
    PREPARING,
    READY,
    PLAYING
}

export interface PlayingStateUpdate {
    seed: number;
    opponentId: string;
}

export type GameStateUpdate = PlayingStateUpdate;
