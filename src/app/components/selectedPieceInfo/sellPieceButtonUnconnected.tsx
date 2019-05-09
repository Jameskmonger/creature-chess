import * as React from "react";
import { PokemonPiece, getPokemonDefinition } from "@common";

interface Props {
    piece: PokemonPiece;
    onClick: () => void;
}

const SellPieceButtonUnconnected: React.FunctionComponent<Props> = (props) => (
    <button onClick={props.onClick}>Sell (${getPokemonDefinition(props.piece.pokemonId).cost})</button>
);

export { SellPieceButtonUnconnected };
