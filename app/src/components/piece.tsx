import * as React from "react";
import { PokemonPiece } from "../models/pokemon-piece";

const getPercentage = (current: number, max: number) => {
    return Math.floor((current / max) * 100) + "%";
};

export const Piece: React.FunctionComponent<{ piece: PokemonPiece }> = (props) => {
    const { facingAway, pokemonId, friendly, currentHealth, maxHealth } = props.piece;

    return (
        <div className="piece">
            <img src={`/images/${facingAway ? "back" : "front"}/${pokemonId}.png`} />

            <div className="info">
                <div className={`healthbar ${friendly ? "friendly" : "enemy"}`}>
                    <div className="fill" style={{ width: getPercentage(currentHealth, maxHealth) }} />
                </div>
            </div>
        </div>
    );
};
