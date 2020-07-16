import * as React from "react";
import { Constants } from "@common/models";
import { BoardTile } from "./tile/boardTile";
import { TileStyle } from "@common/models/position";
import { getClassForTileStyle } from "./getClassForTileStyle";

interface TileRowProps {
    tileStyle: TileStyle;
    y: number;
}

const getRowClassForY = (y: number) => {
    if (y === 0) {
        return "first";
    }

    if (y === 7) {
        return "last";
    }

    return "";
};

const BoardRow: React.FunctionComponent<TileRowProps> = ({ y, tileStyle }) => {
    const tiles = [];

    for (let x = 0; x < Constants.GRID_SIZE; x++) {

        tiles.push(
            <BoardTile
                key={`tile-${x}`}
                x={x}
                y={y}
                tileStyle={tileStyle}
            />
        );
    }

    return <div className={`tile-row ${getClassForTileStyle(tileStyle)} ${getRowClassForY(y)}`}>{tiles}</div>;
};

export { BoardRow };
