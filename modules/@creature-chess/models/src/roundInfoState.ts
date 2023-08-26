import { GamePhase } from "./game-phase";

export type RoundInfoState = {
	round: number;
	phase: GamePhase;
	phaseStartedAtSeconds: number;
};
