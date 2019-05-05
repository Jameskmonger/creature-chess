import * as React from "react";
import { createTileCoordinates } from "@common/position";
import { Constants } from "../../../shared";
import { BoardTile } from "./tile/boardTile";

interface TileRowProps {
    y: number;
}

// tslint:disable-next-line:no-bitwise
const isTileDark = (x, y) => ((y ^ x) & 1) !== 0;

const BoardRow: React.FunctionComponent<TileRowProps> = ({ y }) => {
    const tiles = [];

    for (let x = 0; x < Constants.GRID_SIZE; x++) {

        tiles.push(
            <BoardTile
                key={`tile-${x}`}
                position={createTileCoordinates(x, y)}
            />
        );
    }

    return <div className="tile-row">{tiles}</div>;
};

export { BoardRow };
