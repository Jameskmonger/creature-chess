import * as React from "react";
import { DragObjectWithType, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { PlayerActions } from "@creature-chess/shared";
import { getOverlayClassName } from "./getOverlayClassName";
import { clearSelectedPiece } from "../../features/board/actions";
import { useBelowPieceLimit } from "../context";

type DroppableTileProps = {
    className: string;
    location: PlayerPieceLocation;
}

const getLocationForPiece = (piece: PieceModel): PlayerPieceLocation => (
    piece.position.y !== null
        ? ({
            type: "board",
            location: { x: piece.position.x, y: piece.position.y }
        })
        : ({
            type: "bench",
            location: { slot: piece.position.x }
        })
);

const onDropPiece = (dispatch: Dispatch<any>, location: PlayerPieceLocation) =>
    (item: DragObjectWithType) => {
        const piece: PieceModel = (item as any).piece;
        const from = getLocationForPiece(piece);

        // todo `from` is here as a safety check, is it needed?
        dispatch(PlayerActions.playerDropPieceAction(piece.id, from, location));
        dispatch(clearSelectedPiece());
    };

type PieceDragObject = DragObjectWithType & { piece: PieceModel };
type DropTargetCollectProps = { canDrop: boolean, isDragging: boolean };

const DroppableTile: React.FunctionComponent<DroppableTileProps> = ({ className, location }) => {
    const belowPieceLimit = useBelowPieceLimit();

    const dispatch = useDispatch();
    const [{ canDrop, isDragging }, drop] = useDrop<PieceDragObject, void, DropTargetCollectProps>({
        accept: "Piece",
        drop: onDropPiece(dispatch, location),
        canDrop: ({ piece }) => (
            belowPieceLimit
            || piece.position.y !== null
            || location.type === "bench"
        ),
        collect: monitor => ({
            canDrop: !!monitor.canDrop(),
            isDragging: !!monitor.getItem(),
        }),
    });

    return (
        <div
            ref={drop}
            className={`tile ${className} style-default`}
            touch-action="none"
        >
            <div className={`${getOverlayClassName(isDragging, canDrop)}`} />
        </div>
    );
};

export { DroppableTile }
