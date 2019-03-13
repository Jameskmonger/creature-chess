import * as React from "react";
import { PokemonPiece } from "../models/pokemon-piece";

const Tile: React.FunctionComponent<{ piece: PokemonPiece }> = (props) => {
    return (
        <div className="tile">
            {
                props.piece
                && <img src={`/images/${props.piece.facingAway ? "back" : "front"}/${props.piece.pokemonId}.png`} />

            }
        </div>
    );
};

const TileRow: React.FunctionComponent<{ pieces: PokemonPiece[] }> = (props) => {
    const tiles = [];

    for (let x = 0; x < 6; x++) {
        tiles.push(<Tile key={`tile-${x}`} piece={props.pieces[x]} />);
    }

    return <div className="tile-row">{tiles}</div>;
};

const PokemonBoard: React.FunctionComponent<{ pieces: PokemonPiece[][] }> = (props) => {
    const tileRows = [];

    for (let y = 0; y < 6; y++) {
        tileRows.push(<TileRow key={`tile-row-${y}`} pieces={props.pieces[y]}/>);
    }

    return (
        <div className="chessboard">
            {tileRows}
        </div>
    );
};

export { PokemonBoard };
