import * as React from "react";
import * as ReactDOM from "react-dom";
import { Board } from "./components/board";
import { PokemonPiece } from "./models/pokemon-piece";

import "./style/index.scss";

const makeEnemy = (pokemonId: number) => ({ pokemonId, facingAway: false, friendly: false, maxHealth: 100, currentHealth: 80 });
const makeFriendly = (pokemonId: number) => ({ pokemonId, facingAway: true, friendly: true, maxHealth: 100, currentHealth: 80 });

const pieces: PokemonPiece[][] = [
    [makeEnemy(77), makeEnemy(15), null, null, makeEnemy(123), makeEnemy(58)],
    [null, null, makeEnemy(6), makeEnemy(11), null, null],

    [null, null, null, null, null, null],
    [null, null, null, null, null, null],

    [null, makeFriendly(129), makeFriendly(62), makeFriendly(9), makeFriendly(70), null],
    [null, null, makeFriendly(67), null, null, makeFriendly(89)]
]

ReactDOM.render(
    <div className="board-container">
        <Board pieces={pieces} />
    </div>,
    document.getElementById("approot")
);
