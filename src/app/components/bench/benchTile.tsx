import * as React from "react";
import { BenchPokemonPiece } from "@common/pokemon-piece";
import { BenchPiece } from "./benchPiece";

interface BenchTileProps {
    piece: BenchPokemonPiece;
}

const BenchTile: React.FunctionComponent<BenchTileProps> = ({ piece }) => (
    <div className={`tile bench`}>
        {piece && <BenchPiece piece={piece} />}
    </div>
);

export {
    BenchTile
};
