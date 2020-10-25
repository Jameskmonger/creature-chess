import * as React from "react";
import { TileType } from "@creature-chess/models";
import { Tile } from "./tile";

interface BenchTileProps {
    slot: number;
}

const BenchTile: React.FunctionComponent<BenchTileProps> = props => {
    return (
        <Tile
            type={TileType.BENCH}
            x={props.slot}
            y={null}
        />
    );
};

export {
    BenchTile
};
