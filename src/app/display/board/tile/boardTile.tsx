import * as React from "react";
import { TileType, TileStyle } from "@common/models/position";
import { Tile } from "./tile";
import { BoardPiece } from "../boardPiece/boardPiece";
import { Piece } from "@common/models";

interface BoardTileProps {
    tileStyle: TileStyle;
    x: number;
    y: number;
}

const renderBoardTilePiece = (piece: Piece) => <BoardPiece piece={piece} key={piece.id} />;

const BoardTile: React.FunctionComponent<BoardTileProps> = props => {
    return (
        <Tile
            type={TileType.BOARD}
            x={props.x}
            y={props.y}
            renderPiece={renderBoardTilePiece}
            tileStyle={props.tileStyle}
        />
    );
};

export {
    BoardTile
};
