export enum GameState {
    WAITING,
    PREPARING,
    READY,
    PLAYING
}

export interface PlayingStateUpdate {
    seed: number;
}

export type GameStateUpdate = PlayingStateUpdate;
