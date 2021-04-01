import pDefer = require("p-defer");
import { fork, all, takeEvery } from "@redux-saga/core/effects";
import createSagaMiddleware from "redux-saga";
import { createStore, combineReducers, applyMiddleware, Store, Reducer } from "redux";
import { GRID_SIZE } from "@creature-chess/models";
import { boardReducer, BoardState, BoardCommands, mergeBoards, rotatePiecesAboutCenter } from "../../board";
import { Player } from "../player";
import { battleSaga, startBattle, BattleFinishEvent, BattleTurnEvent, BATTLE_FINISH_EVENT, BATTLE_TURN_EVENT } from "./combat";
import { GameOptions } from "../options";

interface MatchState {
    board: BoardState;
    turn: number;
}

const turnReducer: Reducer<number, BattleTurnEvent> = (state = 0, event) => (
    event.type === BATTLE_TURN_EVENT ? event.payload.turn : state
);

export class Match {
    public readonly home: Player;
    public readonly away: Player;
    private store: Store<MatchState>;
    private finalBoard: BoardState;

    private serverFinishedMatch = pDefer();
    private clientFinishedMatch = pDefer();

    constructor(home: Player, away: Player, gameOptions: GameOptions) {
        this.home = home;
        this.away = away;
        this.store = this.createStore(gameOptions);

        const board = mergeBoards(GRID_SIZE, home.getBoard().pieces, away.getBoard().pieces);

        this.store.dispatch(BoardCommands.initialiseBoard(board));
    }

    public onClientFinishMatch() {
        this.clientFinishedMatch.resolve();
    }

    public getBoardForPlayer(playerId: string): BoardState {
        const { board: { pieces } } = this.store.getState();

        // rotate the board for the away player, so that their pieces are shown on their own side
        const boardPieces =
            (playerId === this.away.id)
            ? rotatePiecesAboutCenter(GRID_SIZE, pieces)
            : pieces;

        // todo sending the whole BoardState feels messy here, piecePositions isn't used
        return {
            pieces: boardPieces,
            piecePositions: {},
            locked: true
        };
    }

    public getTurn() {
        return this.store.getState().turn;
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

    private createStore(gameOptions: GameOptions) {
        // required to preserve inside the generator
        // tslint:disable-next-line:variable-name
        const _this = this;
        const rootSaga = function*() {
            yield all([
                yield fork(battleSaga, gameOptions),
                yield takeEvery<BattleFinishEvent>(
                    BATTLE_FINISH_EVENT,
                    function*() {
                        _this.onServerFinishMatch();
                    }
                )
            ]);
        };

        const sagaMiddleware = createSagaMiddleware();

        const store = createStore(
            combineReducers<MatchState>({
                board: boardReducer,
                turn: turnReducer
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
