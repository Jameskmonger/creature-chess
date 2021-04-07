import { PieceModel, getDelta } from "@creature-chess/models";
import { BoardSelectors, BoardState } from "../../../../board";

const getLivingEnemies = (piece: PieceModel, board: BoardState): PieceModel[] => {
    const output: PieceModel[] = [];

    for (const other of Object.values(board.pieces)) {
        if (other.ownerId !== piece.ownerId && other.currentHealth > 0) {
            output.push(other);
        }
    }

    return output;
};

export const findTargetId = (piece: PieceModel, board: BoardState): string | null => {
    const enemies = getLivingEnemies(piece, board);

    if (enemies.length === 0) {
        return null;
    }

    const attackerPosition = BoardSelectors.getPiecePosition(board, piece.id);

    const enemyDeltas = enemies.map(enemy => ({
        enemy,
        delta: getDelta(attackerPosition, BoardSelectors.getPiecePosition(board, enemy.id))
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

    return enemyDeltas[0].enemy.id;
};
