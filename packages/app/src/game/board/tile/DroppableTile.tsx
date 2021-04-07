import * as React from "react";
import { DragObjectWithType, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { BenchState, BoardState, BoardSelectors, PlayerActions } from "@creature-chess/shared";
import { getOverlayClassName } from "./getOverlayClassName";
import { clearSelectedPiece } from "../../features/board/actions";
import { useBelowPieceLimit, useBoard } from "../context";
import { AppState } from "../../../store";

type DroppableTileProps = {
    className: string;
    location: PlayerPieceLocation;
}

const getLocationForPiece = (pieceId: string, board: BoardState, bench: BenchState): PlayerPieceLocation => {
    if (board) {
        const boardPiecePosition = BoardSelectors.getPiecePosition(board, pieceId);

        if (boardPiecePosition) {
            return {
                type: "board",
                location: boardPiecePosition
            }
        }
    }

    if (bench) {
        const benchSlot = bench.pieces.findIndex(p => p !== null && p.id === pieceId);

        if (benchSlot > -1) {
            return {
                type: "bench",
                location: { slot: benchSlot }
            }
        }
    }

    return null;
};

const onDropPiece = (dispatch: Dispatch<any>, location: PlayerPieceLocation, board: BoardState, bench: BenchState) =>
    (item: DragObjectWithType) => {
        const piece: PieceModel = (item as any).piece;
        const from = getLocationForPiece(piece.id, board, bench);

        // todo `from` is here as a safety check, is it needed?
        dispatch(PlayerActions.playerDropPieceAction(piece.id, from, location));
        dispatch(clearSelectedPiece());
    };

type PieceDragObject = DragObjectWithType & { piece: PieceModel };
type DropTargetCollectProps = { canDrop: boolean, isDragging: boolean };

const DroppableTile: React.FunctionComponent<DroppableTileProps> = ({ className, location }) => {
    const belowPieceLimit = useBelowPieceLimit();

    // todo tidy this up, Tile shouldn't know about it
    const board = useSelector<AppState, BoardState>(state => state.board);
    const bench = useSelector<AppState, BenchState>(state => state.bench);

    const dispatch = useDispatch();
    const [{ canDrop, isDragging }, drop] = useDrop<PieceDragObject, void, DropTargetCollectProps>({
        accept: "Piece",
        drop: onDropPiece(dispatch, location, board, bench),
        canDrop: ({ piece }) => (
            belowPieceLimit
            || location.type === "bench"
            || Boolean(board.pieces[piece.id])
        ),
        collect: monitor => ({
            canDrop: !!monitor.canDrop(),
            isDragging: !!monitor.getItem(),
        }),
    });

    const onClick = () => dispatch(PlayerActions.playerClickTileAction(location));

    return (
        <div
            ref={drop}
            className={`tile ${className} style-default`}
            touch-action="none"
            onPointerUp={onClick}
        >
            <div className={`${getOverlayClassName(isDragging, canDrop)}`} />
        </div>
    );
};

export { DroppableTile }
