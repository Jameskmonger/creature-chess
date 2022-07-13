import { PieceState } from "../simulator/piece/state";

export type PieceCombatState = {
	/**
	 * Overall piece state used to control behavior.
	 */
	state: PieceState;

	targetId: string | null;

	canMoveAtTurn: number | null;
	canBeAttackedAtTurn: number; // used to stop pieces being hit as soon as they land
	canAttackAtTurn: number | null;
};
