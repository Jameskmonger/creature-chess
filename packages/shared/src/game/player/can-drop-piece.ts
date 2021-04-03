import { PieceModel, GRID_SIZE } from "@creature-chess/models";

const inBench = (targetY: number) => targetY === null;
const inFriendlyBoard = (targetY: number) => targetY !== null && targetY > (GRID_SIZE.height / 2) - 1;

export const canDropPiece = (piece: PieceModel, targetX: number, targetY: number, tileEmpty: boolean, boardLocked: boolean, belowPieceLimit: boolean) => {
    const targetIsBench = inBench(targetY);
    const benchToBenchMove = targetIsBench && inBench(piece.position.y);

    const targetIsFriendlyBoard = inFriendlyBoard(targetY);
    const boardToBoardMove = targetIsFriendlyBoard && inFriendlyBoard(piece.position.y);

    const belowPieceLimitOrBoardToBoard = (targetIsBench || belowPieceLimit || boardToBoardMove);

    return (
        tileEmpty
        && (benchToBenchMove || boardLocked === false)
        && belowPieceLimitOrBoardToBoard
        && (targetIsBench || targetIsFriendlyBoard)
    );
};