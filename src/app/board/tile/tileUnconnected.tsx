import * as React from "react";

import { TileProps } from "./tileProps";
import { DropTargetProps } from "../../draggable/drop-target-props";
import { TileCoordinates, TileType } from "@common/position";
import { GamePhase } from "@common";

// tslint:disable-next-line:no-bitwise
const isBoardTileDark = ({ x, y }: TileCoordinates) => ((y ^ x) & 1) !== 0;

const getClassName = (tileType: TileType, position: TileCoordinates) => {
    if (tileType === TileType.BENCH) {
        return "bench";
    }

    return isBoardTileDark(position) ? "dark" : "light";
};

const getOverlayClassName = (isDragging: boolean, canDrop: boolean) => {
    if (isDragging && canDrop === false) {
        return "overlay not-allowed";
    }

    return "overlay";
};

const TileUnconnected: React.FunctionComponent<TileProps & DropTargetProps> = (props) => {
    const {
        type,
        piece,
        position,
        renderPiece,
        connectDropTarget,
        isDragging,
        canDrop,
        canDropPiece,
        currentSelectedPiece,
        onDropPiece,
        onSelectPiece,
        gamePhase
    } = props;

    const canSelectPiece = (gamePhase === GamePhase.PREPARING || type === TileType.BENCH);
    const selectPiece = () => canSelectPiece && onSelectPiece(piece);
    const dropPiece = () => canDropPiece(currentSelectedPiece) && onDropPiece(currentSelectedPiece);

    // this can be improved by having a piece movement saga
    // that just listens for clicks and drops
    const onClick =
        (
            piece
                ? selectPiece
                : (
                    (currentSelectedPiece)
                        ? dropPiece
                        : null
                )
        );

    const isSelected = piece && currentSelectedPiece && piece.id === currentSelectedPiece.id;

    return connectDropTarget(
        <div
            className={`tile ${getClassName(type, position)}${isSelected ? " selected" : ""}`}
            touch-action="none"
            onPointerUp={onClick}
        >
            {piece && renderPiece(piece)}

            <div className={`${getOverlayClassName(isDragging, canDrop)}`} />
        </div>
    );
};

export {
    TileUnconnected
};
