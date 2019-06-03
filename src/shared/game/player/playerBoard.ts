import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { fork, all } from "@redux-saga/core/effects";
import { evolution } from "../../board/sagas/evolution";

import { Piece } from "../../models/piece";
import { canDropPiece, boardReducer, BenchActions, benchReducer, BoardActions, getFirstEmptyBenchSlot } from "../../board";
import { TileCoordinates, TileType } from "../../position";

interface BoardState {
    board: Piece[];
    bench: Piece[];
}

const createBoardStore = () => {
    const rootSaga = function*() {
        yield all([
            yield fork(evolution)
        ]);
    };

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        combineReducers<BoardState>({
            board: boardReducer,
            bench: benchReducer
        }),
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);

    return store;
};

export class PlayerBoard {
    private store = createBoardStore();

    public getBoard() {
        return this.store.getState().board;
    }

    public getBench() {
        return this.store.getState().bench;
    }

    public addBenchPiece(piece: Piece) {
        const action = BenchActions.benchPieceAdded(piece);

        this.store.dispatch(action);
    }

    public sellPiece(pieceId: string) {
        this.store.dispatch(BoardActions.sellPiece(pieceId));
    }

    public movePieceToBench(piece: Piece, to: TileCoordinates) {
        const action = BoardActions.pieceMoved(piece, to, TileType.BENCH);

        this.store.dispatch(action);
    }

    public movePieceToBoard(piece: Piece, to: TileCoordinates) {
        const action = BoardActions.pieceMoved(piece, to, TileType.BOARD);

        this.store.dispatch(action);
    }

    public clear() {
        this.store.dispatch(BoardActions.piecesUpdated([]));
        this.store.dispatch(BenchActions.benchPiecesUpdated([]));
    }

    public applyDamagePerTurn(template: Piece[]) {
        const applied = this.getBoard().map(p => {
            const matching = template.find(r => r.id === p.id);

            if (!matching) {
                return p;
            }

            return {
                ...p,
                damagePerTurn: matching.damagePerTurn
            };
        });

        this.store.dispatch(BoardActions.piecesUpdated(applied));
    }
}
