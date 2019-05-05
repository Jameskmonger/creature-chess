import { Player } from "./player";
import { PokemonPiece } from "../shared";
import { rotatePiecePosition } from "../shared/pokemon-piece";

export class Match {
    private home: Player;
    private away: Player;
    private board: PokemonPiece[];

    constructor(home: Player, away: Player) {
        this.home = home;
        this.away = away;

        this.board = [
            ...this.home.clone().map(this.mapHomePiece),
            ...this.away.clone().map(this.mapAwayPiece)
        ];
    }

    public getBoard() {
        return this.board;
    }

    private mapHomePiece(piece: PokemonPiece) {
        return {
            ...piece,
            facingAway: true
        };
    }

    private mapAwayPiece(piece: PokemonPiece) {
        return rotatePiecePosition({
            ...piece,
            facingAway: false
        });
    }
}
