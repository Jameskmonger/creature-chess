import pDefer = require("p-defer");
import { fork, all, takeEvery } from "@redux-saga/core/effects";
import createSagaMiddleware from "redux-saga";
import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import { GRID_SIZE } from "@creature-chess/models";
import { boardReducer, BoardState, BoardCommands, mergeBoards } from "../../board";
import { Player } from "../player";
import { TurnSimulator, battle, startBattle, BattleAction, BATTLE_FINISHED } from "./combat";

interface MatchState {
    board: BoardState;
}

export class Match {
    public readonly home: Player;
    public readonly away: Player;
    private readonly turnSimulator: TurnSimulator;
    private readonly turnCount: number;
    private readonly turnDuration: number;
    private store: Store<MatchState>;
    private finalBoard: BoardState;

    private serverFinishedMatch = pDefer();
    private clientFinishedMatch = pDefer();

    constructor(turnSimulator: TurnSimulator, turnCount: number, turnDuration: number, home: Player, away: Player) {
        this.turnSimulator = turnSimulator;
        this.home = home;
        this.away = away;
        this.turnCount = turnCount;
        this.turnDuration = turnDuration;
        this.store = this.createStore();

        const board = mergeBoards(GRID_SIZE, home.getBoard().pieces, away.getBoard().pieces);

        this.store.dispatch(BoardCommands.initialiseBoard(board));
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
            Promise.all([this.serverFinishedMatch.promise, this.clientFinishedMatch.promise])
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
}
