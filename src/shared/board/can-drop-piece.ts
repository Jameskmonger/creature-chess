import { PokemonPiece, GamePhase } from "@common";
import { TileCoordinates } from "@common/position";

const inBench = ({ y }: TileCoordinates) => y === null;
const inFriendlyBoard = ({ y }: TileCoordinates) => y > 3;

export const canDropPiece = (piece: PokemonPiece, target: TileCoordinates, tilePieces: PokemonPiece[], gamePhase: GamePhase, belowPieceLimit: boolean) => {
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
