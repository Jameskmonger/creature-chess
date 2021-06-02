import { GamePhase } from "./game-phase";

export type RoundInfoState = {
	round: number | null;
	phase: GamePhase | null;
	phaseStartedAtSeconds: number | null;
};
