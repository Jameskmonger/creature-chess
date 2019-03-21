import * as React from "react";
import { PokemonPiece } from "@common/pokemon-piece";
import { Tile } from "./tile";

interface TileRowProps {
    y: number;
    pieces: PokemonPiece[];
    boardSize: number;
    friendly: boolean;
}

// tslint:disable-next-line:no-bitwise
const isTileDark = (x, y) => ((y ^ x) & 1) !== 0;

const TileRow: React.FunctionComponent<TileRowProps> = ({ y, pieces, boardSize, friendly }) => {
    const tiles = [];

    for (let x = 0; x < boardSize; x++) {

        const tilePieces = pieces.filter(p => p.position[0] === x);

        tiles.push(
            <Tile
                key={`tile-${x}`}
                pieces={tilePieces}
                dark={isTileDark(x, y)}
                friendly={friendly}
                position={[x, y]}
            />
        );
    }

    return <div className="tile-row">{tiles}</div>;
};

export { TileRow };
