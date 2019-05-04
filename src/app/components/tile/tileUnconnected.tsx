import * as React from "react";

import { TileProps } from "./tileProps";
import { BoardPiece } from "../board/boardPiece/boardPiece";
import { DropTargetProps } from "../draggable/drop-target-props";
import { TileCoordinates, TileType } from "@common/position";

// tslint:disable-next-line:no-bitwise
const isBoardTileDark = ({ x, y }: TileCoordinates) => ((y ^ x) & 1) !== 0;

const getClassName = (tileType: TileType, position: TileCoordinates) => {
    if (tileType === TileType.BENCH) {
        return "bench";
    }

    return isBoardTileDark(position) ? "dark" : "light";
};

const TileUnconnected: React.FunctionComponent<TileProps & DropTargetProps> = ({ type, pieces, position, renderPiece, connectDropTarget }) => connectDropTarget(
    <div className={`tile ${getClassName(type, position)}`}>
        {pieces.map(renderPiece)}
    </div>
);

export {
    TileUnconnected
};
