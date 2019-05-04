import * as React from "react";

import { Piece } from "../piece";
import { DropTargetProps, BoardTileProps } from "./boardTileProps";

const BoardTileUnconnected: React.FunctionComponent<BoardTileProps & DropTargetProps> = ({ dark, pieces, connectDropTarget }) => connectDropTarget(
    <div className={`tile ${dark ? "dark" : "light"}`}>
        {pieces.map(piece => <Piece piece={piece} key={piece.id} />)}
    </div>
);

export {
    BoardTileUnconnected
};
