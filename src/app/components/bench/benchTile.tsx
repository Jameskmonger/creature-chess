import * as React from "react";
import { PokemonPiece } from "@common/pokemon-piece";
import { BenchPiece } from "./benchPiece";

interface BenchTileProps {
    piece: PokemonPiece;
}

const BenchTile: React.FunctionComponent<BenchTileProps> = ({ piece }) => (
    <div className={`tile bench`}>
        {piece && <BenchPiece piece={piece} />}
    </div>
);

export {
    BenchTile
};
