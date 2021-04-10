import { AttackType, getDelta, TileCoordinates } from "@creature-chess/models";

export const inAttackRange = (attacker: TileCoordinates, target: TileCoordinates, attackType: AttackType) => {
    const { x: deltaX, y: deltaY } = getDelta(attacker, target);

    // Pieces cannot attack diagonally
    const result = (Math.min(deltaX, deltaY) === 0 && Math.max(deltaX, deltaY) <= attackType.range);
    return result;
};
