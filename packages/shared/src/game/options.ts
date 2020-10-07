import { GamePhase, DEFAULT_TURN_COUNT, DEFAULT_TURN_DURATION, PHASE_LENGTHS } from "@creature-chess/models";

type PhaseLengths = {
    [GamePhase.PREPARING]?: number;
    [GamePhase.READY]?: number;
    [GamePhase.PLAYING]?: number;
};

export type GameOptions = {
    phaseLengths: PhaseLengths;
    turnCount: number;
    turnDuration: number;
};

const defaultOptions: GameOptions = {
    phaseLengths: PHASE_LENGTHS,
    turnCount: DEFAULT_TURN_COUNT,
    turnDuration: DEFAULT_TURN_DURATION
};

export const getOptions = (options?: Partial<GameOptions>) => {
    return { ...defaultOptions, ...options };
};
