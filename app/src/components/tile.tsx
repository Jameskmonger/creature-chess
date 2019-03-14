import * as React from "react";
import { PokemonPiece } from '../models/pokemon-piece';
import { Piece } from './piece';

interface TileProps {
    dark: boolean,
    piece: PokemonPiece
}

export const Tile: React.FunctionComponent<TileProps> = ({ dark, piece }) => (
    <div className={`tile ${dark ? "dark" : "light"}`}>
        {
            piece && <Piece piece={piece} />
        }
    </div>
);
