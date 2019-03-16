import * as React from "react";
import { PokemonPiece } from "../models/pokemon-piece";
import { Piece } from "./piece";

interface BenchTileProps {
    piece: PokemonPiece;
}

export const BenchTile: React.FunctionComponent<BenchTileProps> = ({ piece }) => (
    <div className={`tile bench`}>
        {piece && <Piece piece={piece} />}
    </div>
);
