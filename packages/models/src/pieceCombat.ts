enum TargetType {
    IN_COMBAT,
    CHASE
}

type PieceBoardState = {
    canMoveAtTurn: number;
    canBeAttackedAtTurn: number; // used to stop pieces being hit as soon as they land
    canAttackAtTurn: number;
    removeFromBoardAtTurn: number;
}

export type PieceCombatState = {
    target?: { type: TargetType, pieceId: string };
    board: PieceBoardState;
}

export const createPieceCombatState = (): PieceCombatState => ({
    board: {
        canMoveAtTurn: null,
        canBeAttackedAtTurn: 0,
        canAttackAtTurn: null,
        removeFromBoardAtTurn: null
    },
    target: null
});
