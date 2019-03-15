import * as React from "react";
import * as ReactDOM from "react-dom";
import { Board } from "./components/board";
import { PokemonPiece, PiecePosition } from "./models/pokemon-piece";

import "./style/index.scss";

const makeEnemy = (pokemonId: number, position: PiecePosition) => 
    ({ pokemonId, facingAway: false, friendly: false, maxHealth: 100, currentHealth: 80, position });

const makeFriendly = (pokemonId: number, position: PiecePosition) => 
    ({ pokemonId, facingAway: true, friendly: true, maxHealth: 100, currentHealth: 80, position });

const pieces: PokemonPiece[] = [
    makeEnemy(77, [0, 0]), 
    makeEnemy(15, [1, 0]), 
    makeEnemy(123, [4, 0]), 
    makeEnemy(58, [5, 0]),
    makeEnemy(6, [2, 1]),
    makeEnemy(11, [3, 1]),
    
    makeFriendly(129, [1, 6]),
    makeFriendly(62, [2, 6]), 
    makeFriendly(9, [6, 6]), 
    makeFriendly(70, [7, 6]),
    makeFriendly(67, [2, 7]),
    makeFriendly(89, [5, 7]),
]

ReactDOM.render(
    <div className="board-container">
        <Board pieces={pieces} />
    </div>,
    document.getElementById("approot")
);
