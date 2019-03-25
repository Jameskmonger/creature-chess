import * as React from "react";
import { Tile } from "./tile";
import { createTileCoordinates } from "@common/position";

interface TileRowProps {
    y: number;
    boardSize: number;
    friendly: boolean;
}

// tslint:disable-next-line:no-bitwise
const isTileDark = (x, y) => ((y ^ x) & 1) !== 0;

const TileRow: React.FunctionComponent<TileRowProps> = ({ y, boardSize, friendly }) => {
    const tiles = [];

    for (let x = 0; x < boardSize; x++) {

        tiles.push(
            <Tile
                key={`tile-${x}`}
                dark={isTileDark(x, y)}
                friendly={friendly}
                position={createTileCoordinates(x, y)}
            />
        );
    }

    return <div className="tile-row">{tiles}</div>;
};

export { TileRow };
