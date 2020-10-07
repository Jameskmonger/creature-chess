import present = require("present");
import { eventChannel, buffers } from "redux-saga";
import { IndexedPieces } from "@creature-chess/models";
import { isATeamDefeated } from "../../../utils";
import { BoardState, BoardCommands } from "../../../board";
import { TurnSimulator } from "./turnSimulator";

export const BATTLE_TURN = "BATTLE_TURN";
export type BATTLE_TURN = typeof BATTLE_TURN;
export const BATTLE_FINISH_EVENT = "BATTLE_FINISH_EVENT";
export type BATTLE_FINISH_EVENT = typeof BATTLE_FINISH_EVENT;

export type BattleFinishEvent = ({ type: BATTLE_FINISH_EVENT, payload: { turns: number } });

export type BattleEvent = BoardCommands.InitialiseBoardCommand | BattleFinishEvent;

const battleFinishEvent = (turns: number): BattleFinishEvent => ({ type: BATTLE_FINISH_EVENT, payload: { turns } });

const duration = (ms: number) => {
    const startTime = present();

    return {
        remaining: () => {
            return new Promise(resolve => {
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

const addBattleBrains = (pieces: IndexedPieces) => {
    return Object.entries(pieces)
        .reduce<IndexedPieces>((acc, [pieceId, piece]) => {
            acc[pieceId] = {
                ...piece,
                battleBrain: {
                    canMoveAtTurn: null,
                    canBeAttackedAtTurn: 0,
                    canAttackAtTurn: null,
                    removeFromBoardAtTurn: null
                }
            };

            return acc;
        }, {});
};

export const battleEventChannel = (
    turnSimulator: TurnSimulator,
    turnDuration: number,
    startingBoardState: BoardState,
    maxTurns: number,
    bufferSize: number
) => {
    return eventChannel<BattleEvent>(emit => {
        let cancelled = false;

        let board: BoardState = {
            pieces: addBattleBrains(startingBoardState.pieces),
            piecePositions: {
                ...startingBoardState.piecePositions
            },
            locked: startingBoardState.locked
        };

        const run = async () => {
            let turnCount = 0;

            while (true) {
                const shouldStop = (
                    cancelled
                    || turnCount >= maxTurns
                    || isATeamDefeated(board)
                );

                if (shouldStop) {
                    emit(battleFinishEvent(turnCount));
                    break;
                }

                const turnTimer = duration(turnDuration);

                board = turnSimulator.simulateTurn(++turnCount, board);
                emit(BoardCommands.initialiseBoard(board.pieces));

                await turnTimer.remaining();
            }
        };

        run();

        return () => {
            cancelled = true;
        };
    }, buffers.expanding(bufferSize));
};
