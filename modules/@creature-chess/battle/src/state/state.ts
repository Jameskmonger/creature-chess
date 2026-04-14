import { PieceState } from "../simulator/piece/state";

export type BattleStats = {
	damageDealt: number;
	damageTaken: number;
	turnsSurvived: number;
};

export type PieceCombatState = {
	/**
	 * Overall piece state used to control behavior.
	 */
	state: PieceState;

	canMoveAtTurn: number;
	canBeAttackedAtTurn: number; // used to stop pieces being hit as soon as they land
	canAttackAtTurn: number;

	currentHealth: number;

	/**
	 * Is the piece facing away from the viewer (i.e. looking "north")
	 */
	facingAway: boolean;

	battleStats: BattleStats;
};
