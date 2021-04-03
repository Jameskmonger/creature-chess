import * as React from "react";
import { DragObjectWithType, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { PlayerActions } from "@creature-chess/shared";
import { getOverlayClassName } from "./getOverlayClassName";
import { clearSelectedPiece } from "../../features/board/actions";

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

        dispatch(PlayerActions.playerDropPieceAction(piece.id, from, location));
        dispatch(clearSelectedPiece());
    };

const DroppableTile: React.FunctionComponent<DroppableTileProps> = ({ className, location }) => {
    const dispatch = useDispatch();
    const [{ isDragging }, drop] = useDrop({
        accept: "Piece",
        drop: onDropPiece(dispatch, location),
        collect: monitor => ({
            isDragging: !!monitor.getItem(),
        }),
    });

    return (
        <div
            ref={drop}
            className={`tile ${className} style-default`}
            touch-action="none"
        >
            <div className={`${getOverlayClassName(isDragging, true)}`} />
        </div>
    );
};

export { DroppableTile }
