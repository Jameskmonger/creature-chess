import { AttackType, PieceModel, getDelta } from "@creature-chess/models";

export const inAttackRange = (a: PieceModel, b: PieceModel, attackType: AttackType) => {
    const { x: deltaX, y: deltaY } = getDelta(a.position, b.position);

    // Pieces cannot attack diagonally
    const result = (Math.min(deltaX, deltaY) === 0 && Math.max(deltaX, deltaY) <= attackType.range);
    return result;
};
