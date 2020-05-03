import * as React from "react";
import { TileType, TileStyle } from "@common/models/position";
import { Tile } from "./tile";

interface BoardTileProps {
    tileStyle: TileStyle;
    x: number;
    y: number;
}

const BoardTile: React.FunctionComponent<BoardTileProps> = props => {
    return (
        <Tile
            type={TileType.BOARD}
            x={props.x}
            y={props.y}
            tileStyle={props.tileStyle}
        />
    );
};

export {
    BoardTile
};
