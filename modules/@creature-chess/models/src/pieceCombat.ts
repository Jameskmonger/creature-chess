type PieceBoardState = {
	canMoveAtTurn: number | null;
	canBeAttackedAtTurn: number; // used to stop pieces being hit as soon as they land
	canAttackAtTurn: number | null;
	removeFromBoardAtTurn: number | null;
};

export type PieceCombatState = {
	targetId: string | null;
	board: PieceBoardState;
};

export const createPieceCombatState = (): PieceCombatState => ({
	board: {
		canMoveAtTurn: null,
		canBeAttackedAtTurn: 0,
		canAttackAtTurn: null,
		removeFromBoardAtTurn: null,
	},
	targetId: null,
});

export const clonePieceCombatState = (combat?: PieceCombatState) => {
	if (!combat || !combat.board) {
		return createPieceCombatState();
	}

	return {
		...combat,
		board: {
			...combat.board,
		},
	};
};
