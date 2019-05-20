import { Models, GamePhase } from "@common";
import { TileCoordinates, inBench, inFriendlyBoard } from "@common/position";

export const canDropPiece = (piece: Models.Piece, target: TileCoordinates, tilePieces: Models.Piece[], gamePhase: GamePhase, belowPieceLimit: boolean) => {
    const targetIsBench = inBench(target);
    const benchToBenchMove = targetIsBench && inBench(piece.position);

    const targetIsFriendlyBoard = inFriendlyBoard(target);
    const boardToBoardMove = targetIsFriendlyBoard && inFriendlyBoard(piece.position);

    const tileEmpty = tilePieces.length === 0;
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
