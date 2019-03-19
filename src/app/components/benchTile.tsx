import * as React from "react";
import { PokemonPiece } from "../../shared/pokemon-piece";
import { Piece } from "./piece";

interface BenchTileProps {
    piece: PokemonPiece;
}

const BenchTile: React.FunctionComponent<BenchTileProps> = ({ piece }) => (
    <div className={`tile bench`}>
        {piece && <Piece piece={piece} />}
    </div>
);

export {
    BenchTile
};
