import * as React from "react";
import { BenchTile } from "./tile/benchTile";
import { Constants } from "@common/models";
import { TileStyle } from "@common/models/position";

const Bench: React.FunctionComponent = props => {
    // get this from local player style
    const tileStyle = TileStyle.DEFAULT;

    const tiles = [];

    for (let x = 0; x < Constants.GRID_SIZE; x++) {
        tiles.push(
            <BenchTile
                key={`tile-${x}`}
                slot={x}
                tileStyle={tileStyle}
            />
        );
    }

    return (
        <>
            {tiles}
        </>
    );
};

export {
    Bench
};
