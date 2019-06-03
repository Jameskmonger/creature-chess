import uuid = require("uuid");
import pDefer = require("p-defer");
import { fork, all, takeEvery } from "@redux-saga/core/effects";
import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { Player } from "../game/player/player";
import { rotatePiecePosition } from "../piece-utils";
import { log } from "../log";
import { Piece } from "../models/piece";
import { MatchResults } from "./matchResults";
import { TurnSimulator } from "./combat/turnSimulator";
import { battle, startBattle } from "./combat/battleSaga";
import { boardReducer, BoardActions } from "../board";
import { BattleAction, BATTLE_FINISHED } from "./combat/battleEventChannel";
import { DAMAGE_RATIO } from "../constants";

interface MatchState {
    board: Piece[];
}

export class Match {
    public readonly home: Player;
    public readonly away: Player;
    private readonly turnSimulator: TurnSimulator;
    private readonly turnCount: number;
    private readonly turnDuration: number;
    private id: string;
    private store: Store<MatchState>;
    private results: MatchResults;

    private serverFinishedMatch = pDefer();
    private clientFinishedMatch = pDefer();

    constructor(turnSimulator: TurnSimulator, turnCount: number, turnDuration: number, home: Player, away: Player) {
        this.turnSimulator = turnSimulator;
        this.id = uuid();
        this.home = home;
        this.away = away;
        this.turnCount = turnCount;
        this.turnDuration = turnDuration;
        this.store = this.createStore();

        const initialBoard = [
            ...this.home.cloneBoard().map(this.mapHomePiece),
            ...this.away.cloneBoard().map(this.mapAwayPiece)
        ];

        this.store.dispatch(BoardActions.piecesUpdated(initialBoard));
    }

    public onClientFinishMatch() {
        this.clientFinishedMatch.resolve();
    }

    public getBoard() {
        return this.store.getState().board;
    }

    public getResults() {
        return this.results;
    }

    public async fight(battleTimeout: Promise<void>): Promise<MatchResults> {
        this.store.dispatch(startBattle());

        await Promise.race([
            battleTimeout,
            Promise.all([ this.serverFinishedMatch.promise, this.clientFinishedMatch.promise ])
        ]);

        log(`${this.home.name} v ${this.away.name} finished`);

        const finalBoard = this.store.getState().board;
        const surviving = finalBoard.filter(p => p.currentHealth > 0);

        this.results = {
            home: surviving.filter(p => p.ownerId === this.home.id),
            away: surviving.filter(p => p.ownerId === this.away.id)
        };

        return this.results;
    }

    private createStore() {
        // required to preserve inside the generator
        // tslint:disable-next-line:variable-name
        const _this = this;
        const rootSaga = function*() {
            yield all([
                yield fork(battle, _this.turnSimulator, _this.turnCount, _this.turnDuration),
                yield takeEvery<BattleAction>(
                    BATTLE_FINISHED,
                    function*(action) {
                        _this.onServerFinishMatch((action.payload as any).turns);
                    }
                )
            ]);
        };

        const sagaMiddleware = createSagaMiddleware();

        const store = createStore(
            combineReducers<MatchState>({
                board: boardReducer
            }),
            applyMiddleware(sagaMiddleware)
        );

        sagaMiddleware.run(rootSaga);

        return store;
    }

    private onServerFinishMatch(turns: number) {
        this.serverFinishedMatch.resolve();

        const safeTurnCount = turns >= 1 ? turns : 1;
        const newBoard = this.getBoard().map(p => {
            if (p.ownerId !== this.home.id) {
                return p;
            }

            return {
                ...p,
                damagePerTurn: (p.totalDamage * DAMAGE_RATIO) / safeTurnCount
            };
        });

        this.store.dispatch(BoardActions.piecesUpdated(newBoard));
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
