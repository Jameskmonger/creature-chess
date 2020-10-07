import { PieceModel, AttackType, Directions, TileCoordinates, GRID_SIZE } from "@creature-chess/models";
import { BoardState } from "../../../board";
import { getBoardPieceForPosition } from "../../player/pieceSelectors";
import { getNextPiecePosition } from "./pathfinding";

type Vector = { x: number, y: number };

const range = (start: number, end: number) => Array.from({length: end - start}, (_, i) => i + 1);

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

    const distances = range(1, attackType.range + 1);

    const tilesForDistance = distances.map(r => attackDirections.map(d => ({ x: d.x * r, y: d.y * r })));

    return tilesForDistance.reduce((a, b) => a.concat(b));
};

const getLivingEnemies = (piece: PieceModel, board: BoardState): PieceModel[] => {
    const output: PieceModel[] = [];

    for (const [id, other] of Object.entries(board.pieces)) {
        if (other.ownerId !== piece.ownerId && other.currentHealth > 0) {
            output.push(other);
        }
    }

    return output;
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

const getTargetPiece = (piece: PieceModel, board: BoardState) => {
    if (piece.targetPieceId === null) {
        return null;
    }

    const target = board.pieces[piece.targetPieceId];

    if (target === undefined || target.currentHealth <= 0) {
        return null;
    }

    return target;
};

export const getAttackableEnemyFromCurrentPosition = (piece: PieceModel, attackType: AttackType, board: BoardState) => {
    const target = getTargetPiece(piece, board);

    if (target && canAttack(piece, target, attackType)) {
        return target;
    }

    const attackDirections = getAttackingTiles(piece.facingAway, attackType);

    for (const direction of attackDirections) {
        const targetPosition = applyVector(piece.position, direction);

        // targetPosition will be null if the direction is out of bounds
        if (targetPosition === null) {
            continue;
        }

        const pieceInTargetPosition = getBoardPieceForPosition(board, targetPosition.x, targetPosition.y);

        if (
            pieceInTargetPosition
            && pieceInTargetPosition.ownerId !== piece.ownerId
            && pieceInTargetPosition.currentHealth > 0
        ) {
            return pieceInTargetPosition;
        }
    }

    return null;
};

const findClosestEnemy = (piece: PieceModel, board: BoardState) => {
    const enemies = getLivingEnemies(piece, board);

    if (enemies.length === 0) {
        return null;
    }

    const enemyDeltas = enemies.map(enemy => ({
        enemy,
        delta: getDelta(piece, enemy)
    }));

    // sort by column then by row
    enemyDeltas.sort((a, b) => {
        if (a.delta.y < b.delta.y) {
            return -1;
        }

        if (a.delta.y > b.delta.y) {
            return 1;
        }

        if (a.delta.x < b.delta.x) {
            return -1;
        }

        if (a.delta.x > b.delta.x) {
            return 1;
        }

        if (a.enemy.definition.cost > b.enemy.definition.cost) {
            return -1;
        }

        return 1;
    });

    return enemyDeltas[0].enemy;
};

export const getNewPiecePosition = (piece: PieceModel, board: BoardState): { nextPosition: TileCoordinates, targetPosition: TileCoordinates } => {
    const target = findClosestEnemy(piece, board);

    if (target === null) {
        return null;
    }

    return {
        nextPosition: getNextPiecePosition(piece, target, board),
        targetPosition: target.position
    };
};
