import { GamePhase } from "@creature-chess/models";

export interface GameState {
    round: number | null;
    phase: GamePhase | null;
    phaseStartedAtSeconds: number;
}
