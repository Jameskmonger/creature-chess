import * as React from "react";
import { PokemonPiece } from '../models/pokemon-piece';
import { Tile } from './tile';

interface TileRowProps {
    y: number,
    pieces: PokemonPiece[],
    boardSize: number
}

const isTileDark = (x, y) => ((y ^ x) & 1) !== 0;

export const TileRow: React.FunctionComponent<TileRowProps> = ({ y, pieces, boardSize }) => {
    const tiles = [];

    for (let x = 0; x < boardSize; x++) {

        const piece = pieces.filter(p => p.position[0] === x)[0];

        tiles.push(
            <Tile 
                key={`tile-${x}`} 
                piece={piece} 
                dark={isTileDark(x, y)} 
            />
        );
    }

    return <div className="tile-row">{tiles}</div>;
};
