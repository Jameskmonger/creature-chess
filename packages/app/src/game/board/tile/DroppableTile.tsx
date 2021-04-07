import * as React from "react";
import { DragObjectWithType, useDrop } from "react-dnd";
import { PieceModel } from "@creature-chess/models";
import { getOverlayClassName } from "./getOverlayClassName";
import { useBelowPieceLimit, usePieces } from "../context";

type DroppableTileProps = {
    className: string;
    x: number;
    y: number;
    onDrop: (item: DragObjectWithType & { piece: PieceModel }, x: number, y: number) => void;
    onClick: (x: number, y: number) => void;
}

type PieceDragObject = DragObjectWithType & { piece: PieceModel };
type DropTargetCollectProps = { canDrop: boolean, isDragging: boolean };

const DroppableTile: React.FunctionComponent<DroppableTileProps> = ({ className, x, y, onDrop, onClick }) => {
    const belowPieceLimit = useBelowPieceLimit();
    const pieces = usePieces();

    const [{ canDrop, isDragging }, drop] = useDrop<PieceDragObject, void, DropTargetCollectProps>({
        accept: "Piece",
        drop: item => onDrop(item, x, y),
        canDrop: ({ piece }) => {
            const pieceIsFromSameBoard = Boolean(pieces[piece.id])
            return belowPieceLimit || pieceIsFromSameBoard
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
            onPointerUp={() => onClick(x, y)}
        >
            <div className={`${getOverlayClassName(isDragging, canDrop)}`} />
        </div>
    );
};

export { DroppableTile }
