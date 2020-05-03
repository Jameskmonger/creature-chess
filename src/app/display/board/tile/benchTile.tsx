import * as React from "react";
import { TileStyle, TileType } from "@common/models/position";
import { Tile } from "./tile";

interface BenchTileProps {
    tileStyle: TileStyle;
    slot: number;
}

const BenchTile: React.FunctionComponent<BenchTileProps> = props => {
    return (
        <Tile
            type={TileType.BENCH}
            x={props.slot}
            y={null}
            tileStyle={props.tileStyle}
        />
    );
};

export {
    BenchTile
};
