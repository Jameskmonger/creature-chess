import { BoardState } from "@common/board";

export const isATeamDefeated = (board: BoardState) => {
    const pieces = Object.values(board.pieces);

    const pieceOwnerIds = pieces.map(p => p.ownerId);

    // if there are only pieces belonging to 1 player, then we have a winner
    return (new Set(pieceOwnerIds).size === 1);
};
