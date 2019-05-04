import * as React from "react";
import { BoardTile } from "./boardTile/boardTile";
import { createTileCoordinates } from "@common/position";
import { Constants } from "../../../shared";

interface TileRowProps {
    y: number;
    friendly: boolean;
}

// tslint:disable-next-line:no-bitwise
const isTileDark = (x, y) => ((y ^ x) & 1) !== 0;

const BoardRow: React.FunctionComponent<TileRowProps> = ({ y, friendly }) => {
    const tiles = [];

    for (let x = 0; x < Constants.GRID_SIZE; x++) {

        tiles.push(
            <BoardTile
                key={`tile-${x}`}
                dark={isTileDark(x, y)}
                friendly={friendly}
                position={createTileCoordinates(x, y)}
            />
        );
    }

    return <div className="tile-row">{tiles}</div>;
};

export { BoardRow };
