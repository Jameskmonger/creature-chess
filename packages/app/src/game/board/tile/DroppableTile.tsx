import * as React from "react";
import { DragObjectWithType, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { PlayerActions } from "@creature-chess/shared";
import { getOverlayClassName } from "./getOverlayClassName";
import { useBelowPieceLimit, usePieces } from "../context";

type DroppableTileProps = {
    className: string;
    location: PlayerPieceLocation;
    onDrop: (item: DragObjectWithType & { piece: PieceModel }, location: PlayerPieceLocation) => void;
    onClick: (location: PlayerPieceLocation) => void;
}

type PieceDragObject = DragObjectWithType & { piece: PieceModel };
type DropTargetCollectProps = { canDrop: boolean, isDragging: boolean };

const DroppableTile: React.FunctionComponent<DroppableTileProps> = ({ className, location, onDrop, onClick }) => {
    const belowPieceLimit = useBelowPieceLimit();
    const pieces = usePieces();

    const [{ canDrop, isDragging }, drop] = useDrop<PieceDragObject, void, DropTargetCollectProps>({
        accept: "Piece",
        drop: item => onDrop(item, location),
        canDrop: ({ piece }) => {
            return belowPieceLimit || !pieces || Boolean(pieces[piece.id])
        },
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
            onPointerUp={() => onClick(location)}
        >
            <div className={`${getOverlayClassName(isDragging, canDrop)}`} />
        </div>
    );
};

export { DroppableTile }
