import * as React from "react";

import { TileProps } from "./tileProps";
import { DropTargetProps } from "../../../draggable/drop-target-props";
import { XYLocation, TileType, TileStyle } from "@common/models/position";
import { GamePhase } from "@common/models";
import { getClassForTileStyle } from "../getClassForTileStyle";

// tslint:disable-next-line:no-bitwise
const isBoardTileDark = (x: number, y: number) => ((y ^ x) & 1) !== 0;

const getClassName = (tileType: TileType, x: number, y: number) => {
    if (tileType === TileType.BENCH) {
        return "bench";
    }

    return isBoardTileDark(x, y) ? "dark" : "light";
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
        x,
        y,
        renderPiece,
        connectDropTarget,
        isDragging,
        canDrop,
        canDropPiece,
        selectedPiece: currentSelectedPiece,
        onDropPiece,
        onSelectPiece,
        gamePhase,
        tileStyle
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
            className={`tile ${getClassName(type, x, y)}${isSelected ? " selected" : ""} ${getClassForTileStyle(tileStyle)}`}
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
