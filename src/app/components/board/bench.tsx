import * as React from "react";
import { BenchTile } from "./tile/benchTile";
import { Constants } from "@common";

const Bench: React.FunctionComponent = () => {
    const tiles = [];

    for (let x = 0; x < Constants.GRID_SIZE; x++) {
        tiles.push(
            <BenchTile
                key={`tile-${x}`}
                slot={x}
            />
        );
    }

    return (
        <div className="tile-row">{tiles}</div>
    );
};

export {
    Bench
};
