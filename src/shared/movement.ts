import { BoardPokemonPiece } from "./pokemon-piece";
import { getNextPiecePosition } from "./pathfinding";
import { TileCoordinates } from "./position";

const getLivingEnemies = (piece: BoardPokemonPiece, pieces: BoardPokemonPiece[]) => {
    return pieces.filter(other => other.ownerId !== piece.ownerId && other.currentHealth > 0);
};

const getDelta = (a: BoardPokemonPiece, b: BoardPokemonPiece) => {
    return {
        x: Math.abs(a.position.x - b.position.x),
        y: Math.abs(a.position.y - b.position.y)
    };
};

const isAdjacent = (a: BoardPokemonPiece) => {
    return (b: BoardPokemonPiece) => {
        const { x: deltaX, y: deltaY } = getDelta(a, b);

        return (deltaX + deltaY === 1);
    };
};
export const getAttackableEnemy = (piece: BoardPokemonPiece, others: BoardPokemonPiece[]) => {
    return getLivingEnemies(piece, others).find(isAdjacent(piece)) || null;
};

const getTargetPiece = (piece: BoardPokemonPiece, pieces: BoardPokemonPiece[]) => {
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

export const getNewPiecePosition = (piece: BoardPokemonPiece, pieces: BoardPokemonPiece[]): TileCoordinates => {
    const target = getTargetPiece(piece, pieces);

    if (target === null) {
        return null;
    }

    return getNextPiecePosition(piece, target, pieces);
};
