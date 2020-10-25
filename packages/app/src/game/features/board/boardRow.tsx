import * as React from "react";
import { Constants } from "@creature-chess/models";
import { BoardTile } from "./tile/boardTile";

interface TileRowProps {
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

const BoardRow: React.FunctionComponent<TileRowProps> = ({ y }) => {
    const tiles = [];

    for (let x = 0; x < Constants.GRID_SIZE.width; x++) {

        tiles.push(
            <BoardTile
                key={`tile-${x}`}
                x={x}
                y={y}
            />
        );
    }

    return <div className={`tile-row style-default ${getRowClassForY(y)}`}>{tiles}</div>;
};

export { BoardRow };
