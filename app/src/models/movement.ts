import { PokemonPiece } from "./pokemon-piece";
import { getNextPiecePosition } from "./pathfinding";

const getLivingEnemies = (piece: PokemonPiece, pieces: PokemonPiece[]) => {
    return pieces.filter(other => other.friendly !== piece.friendly && other.currentHealth > 0);
};

const getDelta = (a: PokemonPiece, b: PokemonPiece) => {
    return {
        x: Math.abs(a.position[0] - b.position[0]),
        y: Math.abs(a.position[1] - b.position[1])
    };
};

const isAdjacent = (a: PokemonPiece) => {
    return (b: PokemonPiece) => {
        const { x: deltaX, y: deltaY } = getDelta(a, b);

        return (deltaX + deltaY === 1);
    };
};

export const getAttackableEnemy = (piece: PokemonPiece, others: PokemonPiece[]) => {
    return getLivingEnemies(piece, others).find(isAdjacent(piece)) || null;
};

const getTargetPiece = (piece: PokemonPiece, pieces: PokemonPiece[]) => {
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

export const getNewPiecePosition = (piece: PokemonPiece, pieces: PokemonPiece[]): [ number, number ] => {
    const target = getTargetPiece(piece, pieces);

    if (target === null) {
        return null;
    }

    return getNextPiecePosition(piece, target, pieces);
};
