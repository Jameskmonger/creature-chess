import { PieceModel } from "../../models";
import { getNextPiecePosition } from "./pathfinding";
import { AttackType } from "../../models/creatureDefinition";
import { range, flatten } from "lodash";
import { Directions, TileCoordinates, arePositionsEqual } from "@common/models/position";
import { GRID_SIZE } from "@common/models/constants";

type Vector = { x: number, y: number };

const applyVector = (position: TileCoordinates, vector: Vector): TileCoordinates => {
    const newX = position.x + vector.x;
    const newY = position.y + vector.y;

    const maxX = GRID_SIZE.width - 1;
    const maxY = GRID_SIZE.height - 1;

    if (newX < 0 || newY < 0 || newX > maxX || newY > maxY) {
        return null;
    }

    return { x: newX, y: newY };
};

const getAttackingTiles = (facingUp: boolean, attackType: AttackType) => {
    const attackDirections = facingUp
        ? [Directions.UP, Directions.RIGHT, Directions.LEFT, Directions.DOWN]
        : [Directions.DOWN, Directions.LEFT, Directions.RIGHT, Directions.UP];
    return flatten(range(1, attackType.range + 1).map(r => attackDirections.map(d => ({ x: d.x * r, y: d.y * r }))));
};

const getLivingEnemies = (piece: PieceModel, pieces: PieceModel[]) => {
    return pieces.filter(other => other.ownerId !== piece.ownerId && other.currentHealth > 0);
};

const getDelta = (a: PieceModel, b: PieceModel) => {
    return {
        x: Math.abs(a.position.x - b.position.x),
        y: Math.abs(a.position.y - b.position.y)
    };
};

const canAttack = (a: PieceModel, b: PieceModel, attackType: AttackType) => {
    const { x: deltaX, y: deltaY } = getDelta(a, b);

    // Pieces cannot attack diagonally
    const result = (Math.min(deltaX, deltaY) === 0 && Math.max(deltaX, deltaY) <= attackType.range);
    return result;
};

const getTargetPiece = (piece: PieceModel, others: PieceModel[]) => {
    if (piece.targetPieceId === null) {
        return null;
    }

    const target = others.find(o => o.id === piece.targetPieceId && o.currentHealth > 0);

    if (target === undefined) {
        return null;
    }

    return target;
};

export const getAttackableEnemy = (piece: PieceModel, attackType: AttackType, others: PieceModel[]) => {
    const target = getTargetPiece(piece, others);

    if (target && canAttack(piece, target, attackType)) {
        return target;
    }

    const attackDirections = getAttackingTiles(piece.facingAway, attackType);

    for (const direction of attackDirections) {
        const targetPosition = applyVector(piece.position, direction);

        // targetPosition will be null if there direction is out of bounds
        if (targetPosition === null) {
            continue;
        }

        const enemyInTile = others.find(other =>
            other.ownerId !== piece.ownerId
            && other.currentHealth > 0
            && arePositionsEqual(targetPosition, other.position)
        );

        if (enemyInTile) {
            return enemyInTile;
        }
    }

    return null;
};

const findClosestEnemy = (piece: PieceModel, pieces: PieceModel[]) => {
    const enemies = getLivingEnemies(piece, pieces);

    if (enemies.length === 0) {
        return null;
    }

    const enemyDeltas = enemies.map(enemy => ({
        enemy,
        delta: getDelta(piece, enemy)
    }));

    // sort by column then by row
    enemyDeltas.sort((a, b) => a.delta.y - b.delta.y || a.delta.x - b.delta.x);

    return enemyDeltas[0].enemy;
};

export const getNewPiecePosition = (piece: PieceModel, pieces: PieceModel[]): TileCoordinates => {
    const target = findClosestEnemy(piece, pieces);

    if (target === null) {
        return null;
    }

    return getNextPiecePosition(piece, target, pieces);
};
