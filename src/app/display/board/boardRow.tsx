import * as React from "react";
import { Constants } from "@common/models";
import { BoardTile } from "./tile/boardTile";

interface TileRowProps {
    y: number;
}

const BoardRow: React.FunctionComponent<TileRowProps> = ({ y }) => {
    const tiles = [];

    for (let x = 0; x < Constants.GRID_SIZE; x++) {

        tiles.push(
            <BoardTile
                key={`tile-${x}`}
                x={x}
                y={y}
            />
        );
    }

    return <div className="tile-row">{tiles}</div>;
};

export { BoardRow };
