import { GamePhase } from "@creature-chess/models";

export interface GameState {
    id: string;
    round: number | null;
    phase: GamePhase;
    phaseStartedAtSeconds: number;
}
