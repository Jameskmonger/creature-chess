import pDefer = require("p-defer");
import { v4 as uuid } from "uuid";
import { fork, all, takeEvery } from "@redux-saga/core/effects";
import createSagaMiddleware from "redux-saga";
import { createStore, combineReducers, applyMiddleware, Store, Reducer } from "redux";
import { BoardState, mergeBoards, rotatePiecesAboutCenter, createBoardSlice, BoardSelectors, BoardPiecesState } from "@creature-chess/board";
import { Player } from "../player";
import { battleSaga, startBattle, BattleFinishEvent, BattleTurnEvent, BATTLE_FINISH_EVENT, BATTLE_TURN_EVENT } from "./combat";
import { GameOptions } from "../options";
import { GRID_SIZE, PieceModel } from "@creature-chess/models";

interface MatchState {
    board: BoardState<PieceModel>;
    turn: number;
}

const turnReducer: Reducer<number, BattleTurnEvent> = (state = 0, event) => (
    event.type === BATTLE_TURN_EVENT ? event.payload.turn : state
);

export class Match {
    public readonly home: Player;
    public readonly away: Player;
    private store: Store<MatchState>;
    private finalBoard: BoardState<PieceModel>;
    private boardId = uuid();
    private board = createBoardSlice<PieceModel>(this.boardId, GRID_SIZE);

    private serverFinishedMatch = pDefer();
    private clientFinishedMatch = pDefer();

    constructor(home: Player, away: Player, gameOptions: GameOptions) {
        this.home = home;
        this.away = away;
        this.store = this.createStore(gameOptions);

        const mergedBoard = mergeBoards(this.boardId, home.getBoard(), away.getBoard());

        const board: BoardState<PieceModel> = {
            ...mergedBoard,
            pieces: Object.entries(mergedBoard.pieces).reduce<BoardPiecesState<PieceModel>>(
                (acc, [id, piece]) => ({
                    ...acc,
                    [id]: {
                        ...piece,
                        facingAway: (piece.ownerId === home.id)
                    }
                }),
                {}
            )
        }

        this.store.dispatch(this.board.commands.setBoardPiecesCommand(board));
    }

    public onClientFinishMatch() {
        this.clientFinishedMatch.resolve();
    }

    public getBoardForPlayer(playerId: string): BoardState<PieceModel> {
        const { board } = this.store.getState();

        // rotate the board for the away player, so that their pieces are shown on their own side

        if (playerId === this.away.id) {
            const rotatedBoard = rotatePiecesAboutCenter(board);

            // todo improve this

            const newState: BoardState<PieceModel> = {
                ...rotatedBoard,
                pieces: Object.entries(rotatedBoard.pieces).reduce<BoardPiecesState<PieceModel>>(
                    (acc, [id, piece]) => ({
                        ...acc,
                        [id]: {
                            ...piece,
                            facingAway: !piece.facingAway
                        }
                    }),
                    {}
                )
            }

            return newState;
        }

        return board;
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
                yield fork(battleSaga, gameOptions, _this.board),
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
                board: this.board.boardReducer,
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
