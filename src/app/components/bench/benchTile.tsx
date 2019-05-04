import * as React from "react";
import { createTileCoordinates, TileType } from "@common/position";
import { Tile } from "../tile/tile";
import { BenchPiece } from "./benchPiece/benchPiece";
import { PokemonPiece } from "../../../shared";

interface BenchTileProps {
    slot: number;
}

const renderBenchTilePiece = (piece: PokemonPiece) => <BenchPiece piece={piece} key={piece.id} />;

const BenchTile: React.FunctionComponent<BenchTileProps> = props => {
    return (
        <Tile
            type={TileType.BENCH}
            position={createTileCoordinates(props.slot, null)}
            renderPiece={renderBenchTilePiece}
        />
    );
};

export {
    BenchTile
};
