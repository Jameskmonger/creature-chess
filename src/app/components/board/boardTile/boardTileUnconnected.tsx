import * as React from "react";

import { BoardPiece } from "../boardPiece/boardPiece";
import { DropTargetProps, BoardTileProps } from "./boardTileProps";

const BoardTileUnconnected: React.FunctionComponent<BoardTileProps & DropTargetProps> = ({ dark, pieces, connectDropTarget }) => connectDropTarget(
    <div className={`tile ${dark ? "dark" : "light"}`}>
        {pieces.map(piece => <BoardPiece piece={piece} key={piece.id} />)}
    </div>
);

export {
    BoardTileUnconnected
};
