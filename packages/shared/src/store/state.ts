import { GamePhase } from "@creature-chess/models";

export interface GameInfoState {
    round: number | null;
    phase: GamePhase | null;
    phaseStartedAtSeconds: number;
}
