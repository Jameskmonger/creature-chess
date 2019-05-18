import delay from "delay";
import { Player } from "./players/player";
import { Models, Constants } from "@common";
import { rotatePiecePosition } from "@common/piece-utils";
import { isATeamDefeated } from "@common/is-a-team-defeated";
import { simulateTurn } from "@common/fighting-turn-simulator";
import { log } from "./log";
import uuid = require("uuid");

export interface MatchResults {
    home: Models.Piece[];
    away: Models.Piece[];
}

export class Match {
    public readonly home: Player;
    public readonly away: Player;
    private id: string;
    private board: Models.Piece[];
    private results: MatchResults;

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

    public getResults() {
        return this.results;
    }

    public async fight(battleTimeout: Promise<void>, maxTurns: number): Promise<MatchResults> {
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

        this.results = {
            home: surviving.filter(p => p.ownerId === this.home.id),
            away: surviving.filter(p => p.ownerId === this.away.id)
        };

        return this.results;
    }

    private mapHomePiece(piece: Models.Piece) {
        return {
            ...piece,
            facingAway: true
        };
    }

    private mapAwayPiece(piece: Models.Piece) {
        return rotatePiecePosition({
            ...piece,
            facingAway: false
        });
    }
}
