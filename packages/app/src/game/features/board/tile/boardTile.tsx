import * as React from "react";
import { TileType } from "@creature-chess/models";
import { Tile } from "./tile";

interface BoardTileProps {
    x: number;
    y: number;
}

const BoardTile: React.FunctionComponent<BoardTileProps> = props => {
    return (
        <Tile
            type={TileType.BOARD}
            x={props.x}
            y={props.y}
        />
    );
};

export {
    BoardTile
};
