import present = require("present");
import { eventChannel, buffers } from "redux-saga";
import { takeEvery, select, put, call } from "@redux-saga/core/effects";
import { IndexedPieces, createPieceCombatState, PieceModel, GameOptions } from "@creature-chess/models";
import { BoardState, BoardSlice } from "@creature-chess/board";
import { simulateTurn } from "./turnSimulator";
import { isATeamDefeated } from "./utils/is-a-team-defeated";
import { BattleEvent, battleFinishEvent, battleTurnEvent } from "./events";

const START_BATTLE = "START_BATTLE";
type START_BATTLE = typeof START_BATTLE;
type StartBattleCommand = { type: START_BATTLE, payload: { turn?: number } };
export const startBattle = (turn?: number): StartBattleCommand => ({ type: START_BATTLE, payload: { turn } });

const duration = (ms: number) => {
    const startTime = present();

    return {
        remaining: () => {
            return new Promise<void>(resolve => {
                const endTime = present();
                const timePassed = endTime - startTime;

                const remaining = Math.max(ms - timePassed, 0);

                if (remaining === 0) {
                    resolve();
                    return;
                }

                setTimeout(() => resolve(), remaining);
            });
        }
    };
};

const addCombatState = (pieces: IndexedPieces) => {
    return Object.entries(pieces)
        .reduce<IndexedPieces>((acc, [pieceId, piece]) => {
            acc[pieceId] = {
                ...piece,
                combat: createPieceCombatState()
            };

            return acc;
        }, {});
};

const battleEventChannel = (
    startingBoardState: BoardState<PieceModel>,
    boardSlice: BoardSlice<PieceModel>,
    startingTurn: number,
    options: GameOptions,
    bufferSize: number
) => {
    return eventChannel<BattleEvent>(emit => {
        let cancelled = false;

        let board: BoardState<PieceModel> = {
            id: startingBoardState.id,
            pieces: addCombatState(startingBoardState.pieces),
            piecePositions: {
                ...startingBoardState.piecePositions
            },
            locked: startingBoardState.locked,
            size: startingBoardState.size,
            pieceLimit: null
        };

        const run = async () => {
            let turnCount = startingTurn;

            while (true) {
                const shouldStop = (
                    cancelled
                    || turnCount >= options.turnCount
                    || isATeamDefeated(board)
                );

                if (shouldStop) {
                    await duration(1000).remaining();

                    emit(battleFinishEvent(turnCount));
                    break;
                }

                const turnTimer = duration(options.turnDuration);

                board = simulateTurn(++turnCount, board, boardSlice);
                emit(battleTurnEvent(turnCount, board));

                await turnTimer.remaining();
            }
        };

        run();

        return () => {
            cancelled = true;
        };
    }, buffers.expanding(bufferSize));
};

export const battleSaga = function*(gameOptions: GameOptions, boardSlice: BoardSlice<PieceModel>) {
    yield takeEvery<StartBattleCommand>(
        START_BATTLE,
        function*({ payload: { turn } }) {
            const board: BoardState<PieceModel> = yield select(state => state.board);

            // todo no need for the channel here. this can just run synchronously in a loop
            const battleChannel = yield call(battleEventChannel, board, boardSlice, turn || 0, gameOptions, 100);

            yield takeEvery(battleChannel, function*(battleAction: BattleEvent) {
                yield put(battleAction);
            });
        }
    );
};
