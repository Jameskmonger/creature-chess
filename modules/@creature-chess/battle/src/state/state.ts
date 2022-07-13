import { PieceState } from "../simulator/piece/state";

export type PieceCombatState = {
	/**
	 * Overall piece state used to control behavior.
	 */
	state: PieceState;

	canMoveAtTurn: number;
	canBeAttackedAtTurn: number; // used to stop pieces being hit as soon as they land
	canAttackAtTurn: number;
};
