import delay from "delay";
import { Player } from "./player";
import { PokemonPiece } from "../shared";
import { rotatePiecePosition } from "../shared/pokemon-piece";
import { isATeamDefeated } from "../shared/is-a-team-defeated";
import { simulateTurn } from "../shared/fighting-turn-simulator";

export interface MatchResults {
    survivingHomeTeam: PokemonPiece[];
    survivingAwayTeam: PokemonPiece[];
}

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

    public fight(seed: number): Promise<MatchResults> {
        return new Promise<MatchResults>(resolve => {
            while (isATeamDefeated(this.board) === false) {
                this.board = simulateTurn(this.board);
            }

            resolve(this.getCurrentResults());
        });
    }

    private getCurrentResults(): MatchResults {
        const surviving = this.board.filter(p => p.currentHealth > 0);

        return {
            survivingHomeTeam: surviving.filter(p => p.ownerId === this.home.id),
            survivingAwayTeam: surviving.filter(p => p.ownerId === this.away.id)
        };
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
