import { PokemonCard } from "../shared";
import { PokemonPiece } from "../shared/pokemon-piece";

export interface Player {
    cards: PokemonCard[];
    board: PokemonPiece[];
    opponent?: Player;
}
