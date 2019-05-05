import * as React from "react";
import { TileCoordinates, TileType } from "@common/position";
import { Tile } from "./tile";
import { BoardPiece } from "../boardPiece/boardPiece";
import { PokemonPiece } from "@common";

interface BoardTileProps {
    position: TileCoordinates;
}

const renderBoardTilePiece = (piece: PokemonPiece) => <BoardPiece piece={piece} key={piece.id} />;

const BoardTile: React.FunctionComponent<BoardTileProps> = props => {
    return (
        <Tile
            type={TileType.BOARD}
            position={props.position}
            renderPiece={renderBoardTilePiece}
        />
    );
};

export {
    BoardTile
};
