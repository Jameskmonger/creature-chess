import uuid = require("uuid");
import pDefer = require("p-defer");
import { fork, all, takeEvery } from "@redux-saga/core/effects";
import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import createSagaMiddleware from "redux-saga";
import { Player } from "../game/player/player";
import { pieceUtils } from "@common/utils";
import { log } from "../log";
import { Piece } from "../models/piece";
import { TurnSimulator } from "./combat/turnSimulator";
import { battle, startBattle } from "./combat/battleSaga";
import { boardReducer, BoardActions } from "../board";
import { BattleAction, BATTLE_FINISHED } from "./combat/battleEventChannel";

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
    private finalBoard: Piece[];

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

    public getFinalBoard() {
        return this.finalBoard;
    }

    public async fight(battleTimeout: Promise<void>) {
        this.store.dispatch(startBattle());

        await Promise.race([
            battleTimeout,
            Promise.all([ this.serverFinishedMatch.promise, this.clientFinishedMatch.promise ])
        ]);

        this.finalBoard = this.store.getState().board;
        return this.finalBoard;
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
                    function*() {
                        _this.onServerFinishMatch();
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

    private onServerFinishMatch() {
        this.serverFinishedMatch.resolve();
    }

    private mapHomePiece(piece: Piece) {
        return {
            ...piece,
            facingAway: true
        };
    }

    private mapAwayPiece(piece: Piece) {
        return pieceUtils.rotatePiecePosition({
            ...piece,
            facingAway: false
        });
    }
}
