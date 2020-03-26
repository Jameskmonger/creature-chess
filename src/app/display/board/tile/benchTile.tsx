import * as React from "react";
import { createTileCoordinates, TileType } from "@common/models/position";
import { Tile } from "./tile";
import { BenchPiece } from "../benchPiece/benchPiece";
import { Piece } from "@common/models";

interface BenchTileProps {
    slot: number;
}

const renderBenchTilePiece = (piece: Piece) => <BenchPiece piece={piece} key={piece.id} />;

const BenchTile: React.FunctionComponent<BenchTileProps> = props => {
    return (
        <Tile
            type={TileType.BENCH}
            x={props.slot}
            y={null}
            renderPiece={renderBenchTilePiece}
        />
    );
};

export {
    BenchTile
};
