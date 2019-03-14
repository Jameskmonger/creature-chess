import * as React from "react";
import { PokemonPiece } from "../models/pokemon-piece";
import { Piece } from "./piece";

const isTileDark = (x, y) => ((y ^ x) & 1) !== 0;

const gridSize = 8;

const Tile: React.FunctionComponent<{ dark: boolean, piece: PokemonPiece }> = (props) => {
    return (
        <div className={`tile ${props.dark ? "dark" : "light"}`}>
            {
                props.piece
                && <Piece piece={props.piece} />
            }
        </div>
    );
};

const TileRow: React.FunctionComponent<{ y: number, pieces: PokemonPiece[] }> = (props) => {
    const tiles = [];

    for (let x = 0; x < gridSize; x++) {
        tiles.push(<Tile key={`tile-${x}`} piece={props.pieces[x]} dark={isTileDark(x, props.y)} />);
    }

    return <div className="tile-row">{tiles}</div>;
};

const Board: React.FunctionComponent<{ pieces: PokemonPiece[][] }> = (props) => {
    const tileRows = [];

    for (let y = 0; y < gridSize; y++) {
        const rowPieces = props.pieces[y];

        tileRows.push(<TileRow key={`tile-row-${y}`} y={y} pieces={rowPieces} />);
    }

    return (
        <div className="chessboard">
            {tileRows}
        </div>
    );
};

export { Board };
