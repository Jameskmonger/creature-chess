import * as React from "react";
import * as ReactDOM from "react-dom";
import { Board } from "./components/board";
import { PokemonPiece } from "./models/pokemon-piece";
import { PokemonBoard } from "./components/pokemon-board";

const facingTowards = (pokemonId: number) => ({ pokemonId, facingAway: false });
const facingAway = (pokemonId: number) => ({ pokemonId, facingAway: true });

const pieces: PokemonPiece[][] = [
    [facingTowards(77), facingTowards(15), null, null, facingTowards(123), facingTowards(58)],
    [null, null, facingTowards(6), facingTowards(11), null, null],

    [null, null, null, null, null, null],
    [null, null, null, null, null, null],

    [null, facingAway(129), facingAway(62), facingAway(9), facingAway(70), null],
    [null, null, facingAway(67), null, null, facingAway(89)]
]

ReactDOM.render(
    <div className="board-container">
        <Board />

        <PokemonBoard pieces={pieces} />
    </div>,
    document.getElementById("approot")
);
