import { PieceModel, getDelta } from "@creature-chess/models";
import { BoardSelectors, BoardState } from "@creature-chess/board";

const getLivingEnemies = (piece: PieceModel, board: BoardState<PieceModel>): PieceModel[] =>
    BoardSelectors.getAllPieces(board).filter(other => other.ownerId !== piece.ownerId && other.currentHealth > 0);

export const findTargetId = (piece: PieceModel, board: BoardState<PieceModel>): string | null => {
    const enemies = getLivingEnemies(piece, board);

    if (enemies.length === 0) {
        return null;
    }

    const attackerPosition = BoardSelectors.getPiecePosition(board, piece.id);

    const enemyDeltas = enemies.map(enemy => {
        const enemyPosition = BoardSelectors.getPiecePosition(board, enemy.id)

        if (!enemyPosition) {
            return null;
        }

        return {
            enemy,
            delta: getDelta(attackerPosition, enemyPosition)
        };
    }).filter(x => x !== null);

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