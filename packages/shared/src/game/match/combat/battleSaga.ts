import present = require("present");
import { eventChannel, buffers } from "redux-saga";
import { takeEvery, select, put, call } from "@redux-saga/core/effects";
import { IndexedPieces, createPieceCombatState } from "@creature-chess/models";
import { isATeamDefeated } from "../../../utils";
import { BoardState, BoardCommands } from "../../../board";
import { simulateTurn } from "./turnSimulator";
import { GameOptions } from "../../options";

export const BATTLE_TURN_EVENT = "BATTLE_TURN_EVENT";
export type BATTLE_TURN_EVENT = typeof BATTLE_TURN_EVENT;
export const BATTLE_FINISH_EVENT = "BATTLE_FINISH_EVENT";
export type BATTLE_FINISH_EVENT = typeof BATTLE_FINISH_EVENT;

export type BattleTurnEvent = ({ type: BATTLE_TURN_EVENT, payload: { turn: number } });
export type BattleFinishEvent = ({ type: BATTLE_FINISH_EVENT, payload: { turns: number } });

export type BattleEvent = ReturnType<typeof BoardCommands.setBoardPiecesCommand> | BattleTurnEvent | BattleFinishEvent;

const battleTurnEvent = (turn: number): BattleTurnEvent => ({ type: BATTLE_TURN_EVENT, payload: { turn } });
const battleFinishEvent = (turns: number): BattleFinishEvent => ({ type: BATTLE_FINISH_EVENT, payload: { turns } });

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
    startingBoardState: BoardState,
    startingTurn: number,
    options: GameOptions,
    bufferSize: number
) => {
    return eventChannel<BattleEvent>(emit => {
        let cancelled = false;

        let board: BoardState = {
            pieces: addCombatState(startingBoardState.pieces),
            piecePositions: {
                ...startingBoardState.piecePositions
            },
            locked: startingBoardState.locked,
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

                board = simulateTurn(++turnCount, board);
                emit(battleTurnEvent(turnCount));
                emit(BoardCommands.setBoardPiecesCommand({ pieces: board.pieces, piecePositions: board.piecePositions }));

                await turnTimer.remaining();
            }
        };

        run();

        return () => {
            cancelled = true;
        };
    }, buffers.expanding(bufferSize));
};

export const battleSaga = function*(gameOptions: GameOptions) {
    yield takeEvery<StartBattleCommand>(
        START_BATTLE,
        function*({ payload: { turn } }) {
            const board: BoardState = yield select(state => state.board);

            // todo no need for the channel here. this can just run synchronously in a loop
            const battleChannel = yield call(battleEventChannel, board, turn || 0, gameOptions, 100);

            yield takeEvery(battleChannel, function*(battleAction: BattleEvent) {
                yield put(battleAction);
            });
        }
    );
};
