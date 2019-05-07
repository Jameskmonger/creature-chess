import delay from "delay";
import { Player } from "./players/player";
import { PokemonPiece, Constants } from "../shared";
import { rotatePiecePosition } from "../shared/pokemon-piece";
import { isATeamDefeated } from "../shared/is-a-team-defeated";
import { simulateTurn } from "../shared/fighting-turn-simulator";
import { log } from "./log";

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

    public fight(seed: number, maxTurns: number): Promise<MatchResults> {
        const fightName = `${this.home.name} v ${this.away.name}`;

        return new Promise<MatchResults>(resolve => {
            let turn = 0;

            while (true) {
                const defeated = isATeamDefeated(this.board);

                if (defeated) {
                    log(`Fight '${fightName}' ended at turn ${turn}`);
                    break;
                }

                if (turn >= maxTurns) {
                    log(`Fight '${fightName}' timed out at turn ${turn}`);
                    break;
                }

                this.board = simulateTurn(this.board);
                turn++;
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
