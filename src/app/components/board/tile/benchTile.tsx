import * as React from "react";
import { createTileCoordinates, TileType } from "@common/position";
import { Tile } from "./tile";
import { BenchPiece } from "../benchPiece/benchPiece";
import { Models } from "@common";

interface BenchTileProps {
    slot: number;
}

const renderBenchTilePiece = (piece: Models.Piece) => <BenchPiece piece={piece} key={piece.id} />;

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
