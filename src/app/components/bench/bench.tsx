import * as React from "react";
import { PokemonPiece } from "@common/pokemon-piece";
import { BenchTile } from "./benchTile";

interface BenchProps {
    boardSize: number;
    pieces: PokemonPiece[];
}

const Bench: React.FunctionComponent<BenchProps> = ({ boardSize, pieces }) => {
    const tiles = [];

    for (let x = 0; x < boardSize; x++) {
        const piece = pieces.find(p => p.position[1] === x && p.benched);

        tiles.push(
            <BenchTile
                key={`tile-${x}`}
                piece={piece}
            />
        );
    }

    return (
        <div className="tile-row">{tiles}</div>
    );
};

export {
    Bench
};
