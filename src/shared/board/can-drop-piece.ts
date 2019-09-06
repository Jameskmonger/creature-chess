import { Models, GamePhase } from "@common";
import { TileCoordinates, inBench, inFriendlyBoard } from "@common/position";

export const canDropPiece = (piece: Models.Piece, target: TileCoordinates, tileEmpty: boolean, gamePhase: GamePhase, belowPieceLimit: boolean) => {
    const targetIsBench = inBench(target);
    const benchToBenchMove = targetIsBench && inBench(piece.position);

    const targetIsFriendlyBoard = inFriendlyBoard(target);
    const boardToBoardMove = targetIsFriendlyBoard && inFriendlyBoard(piece.position);

    const inPreparingPhase = gamePhase === GamePhase.PREPARING;

    const inPreparingPhaseOrBenchToBench = (inPreparingPhase || benchToBenchMove);
    const belowPieceLimitOrBoardToBoard = (targetIsBench || belowPieceLimit || boardToBoardMove);

    return (
        tileEmpty
        && inPreparingPhaseOrBenchToBench
        && belowPieceLimitOrBoardToBoard
        && (targetIsBench || targetIsFriendlyBoard)
    );
};
