import * as React from "react";

import { TileProps } from "./tileProps";
import { DropTargetProps } from "../../draggable/drop-target-props";
import { TileCoordinates, TileType } from "@common/position";

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
    const { type, piece, position, renderPiece, connectDropTarget, isDragging, canDrop, selectedPieceId } = props;

    const hasSelectedPiece = (piece && piece.id === selectedPieceId);

    return connectDropTarget(
        <div className={`tile ${getClassName(type, position)}${hasSelectedPiece ? " selected" : ""}`}>
            {piece && renderPiece(piece)}

            <div className={`${getOverlayClassName(isDragging, canDrop)}`} />
        </div>
    );
};

export {
    TileUnconnected
};
