import delay from "delay";
import uuid = require("uuid");
import { Player } from "../game/player";
import { rotatePiecePosition } from "../piece-utils";
import { isATeamDefeated } from "../is-a-team-defeated";
import { log } from "../log";
import { Piece } from "../models/piece";
import { TURN_DURATION_MS } from "../constants";
import { MatchResults } from "./matchResults";
import { TurnSimulator } from "./combat/turnSimulator";

export class Match {
    public readonly home: Player;
    public readonly away: Player;
    private readonly turnSimulator: TurnSimulator;
    private id: string;
    private board: Piece[];
    private results: MatchResults;

    private clientFinishedMatch: Promise<void>;
    private resolveClientFinishMatch: () => void;

    constructor(turnSimulator: TurnSimulator, home: Player, away: Player) {
        this.turnSimulator = turnSimulator;
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

            this.board = this.turnSimulator.simulateTurn(this.board);
            turnCount++;
        }

        const surviving = this.board.filter(p => p.currentHealth > 0);

        const minTimePassed = delay(turnCount * TURN_DURATION_MS);

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

    private mapHomePiece(piece: Piece) {
        return {
            ...piece,
            facingAway: true
        };
    }

    private mapAwayPiece(piece: Piece) {
        return rotatePiecePosition({
            ...piece,
            facingAway: false
        });
    }
}
