import { PieceModel, getDelta, TileCoordinates } from "@creature-chess/models";
import { BoardSelectors, BoardState } from "@creature-chess/board";

const getLivingEnemies = (piece: PieceModel, board: BoardState<PieceModel>): PieceModel[] =>
    BoardSelectors.getAllPieces(board).filter(other => other.ownerId !== piece.ownerId && other.currentHealth > 0);

type EnemyDelta = { enemy: PieceModel, delta: TileCoordinates };

const getEnemyDeltas = (board: BoardState, enemies: PieceModel[], attackerPosition: TileCoordinates): EnemyDelta[] => {
    const enemyDeltas: EnemyDelta[] = [];

    for (const enemy of enemies) {
        const enemyPosition = BoardSelectors.getPiecePosition(board, enemy.id);

        if (!enemyPosition) {
            continue;
        }

        enemyDeltas.push({
            enemy,
            delta: getDelta(attackerPosition, enemyPosition)
        });
    }

    return enemyDeltas;
}

export const findTargetId = (piece: PieceModel, board: BoardState<PieceModel>): string | null => {
    const enemies = getLivingEnemies(piece, board);

    if (enemies.length === 0) {
        return null;
    }

    const attackerPosition = BoardSelectors.getPiecePosition(board, piece.id);

    if (!attackerPosition) {
        return null;
    }

    const enemyDeltas = getEnemyDeltas(board, enemies, attackerPosition);

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

    return enemyDeltas[0].enemy.id;
};
