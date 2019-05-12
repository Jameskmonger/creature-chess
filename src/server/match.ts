import delay from "delay";
import { Player } from "./players/player";
import { PokemonPiece, Constants } from "@common";
import { rotatePiecePosition } from "@common/pokemon-piece";
import { isATeamDefeated } from "@common/is-a-team-defeated";
import { simulateTurn } from "@common/fighting-turn-simulator";
import { log } from "./log";
import uuid = require("uuid");

export interface MatchResults {
    survivingHomeTeam: PokemonPiece[];
    survivingAwayTeam: PokemonPiece[];
}

export class Match {
    private id: string;
    private home: Player;
    private away: Player;
    private board: PokemonPiece[];

    private clientFinishedMatch: Promise<void>;
    private resolveClientFinishMatch: () => void;

    constructor(home: Player, away: Player) {
        this.id = uuid();
        this.home = home;
        this.away = away;

        this.board = [
            ...this.home.cloneBoard().map(this.mapHomePiece),
            ...this.away.cloneBoard().map(this.mapAwayPiece)
        ];

        this.clientFinishedMatch = new Promise(resolve => {
            this.resolveClientFinishMatch = resolve;
        });
    }

    public onClientFinishMatch() {
        this.resolveClientFinishMatch();
    }

    public getBoard() {
        return this.board;
    }

    public async fight(seed: number, battleTimeout: Promise<void>, maxTurns: number): Promise<MatchResults> {
        const fightName = `${this.home.name} v ${this.away.name}`;
        let turnCount = 0;

        while (true) {
            const defeated = isATeamDefeated(this.board);

            if (defeated) {
                log(`Fight '${fightName}' ended at turn ${turnCount}`);
                break;
            }

            if (turnCount >= maxTurns) {
                log(`Fight '${fightName}' timed out at turn ${turnCount}`);
                break;
            }

            this.board = simulateTurn(this.board);
            turnCount++;
        }

        const surviving = this.board.filter(p => p.currentHealth > 0);

        const minTimePassed = delay(turnCount * Constants.TURN_DURATION_MS);

        await Promise.race([
            battleTimeout,
            Promise.all([ minTimePassed, this.clientFinishedMatch ])
        ]);

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
