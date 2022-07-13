import { PieceState } from "../simulator/piece/state";

type PieceBoardState = {
	canMoveAtTurn: number | null;
	canBeAttackedAtTurn: number; // used to stop pieces being hit as soon as they land
	canAttackAtTurn: number | null;
	removeFromBoardAtTurn: number | null;
};

export type PieceCombatState = {
	state: PieceState;
	targetId: string | null;
	board: PieceBoardState;
};
