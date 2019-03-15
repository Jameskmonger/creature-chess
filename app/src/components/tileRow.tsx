import * as React from "react";
import { PokemonPiece } from "../models/pokemon-piece";
import { Tile } from "./tile";

interface TileRowProps {
    y: number;
    pieces: PokemonPiece[];
    boardSize: number;
    movePiece: (piece: PokemonPiece, col: number) => void;
    friendly: boolean;
}

// tslint:disable-next-line:no-bitwise
const isTileDark = (x, y) => ((y ^ x) & 1) !== 0;

const TileRow: React.FunctionComponent<TileRowProps> = ({ y, pieces, boardSize, movePiece, friendly }) => {
    const tiles = [];

    for (let x = 0; x < boardSize; x++) {

        const piece = pieces.filter(p => p.position[0] === x)[0];
        const moveColumnPiece = (p: PokemonPiece) => movePiece(p, x);

        tiles.push(
            <Tile
                key={`tile-${x}`}
                piece={piece}
                dark={isTileDark(x, y)}
                movePiece={moveColumnPiece}
                friendly={friendly}
            />
        );
    }

    return <div className="tile-row">{tiles}</div>;
};

export { TileRow };
