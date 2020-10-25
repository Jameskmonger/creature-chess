import present = require("present");
import { eventChannel, buffers } from "redux-saga";
import { IndexedPieces } from "@creature-chess/models";
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

export type BattleEvent = BoardCommands.InitialiseBoardCommand | BattleTurnEvent | BattleFinishEvent;

const battleTurnEvent = (turn: number): BattleTurnEvent => ({ type: BATTLE_TURN_EVENT, payload: { turn }});
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
    startingBoardState: BoardState,
    options: GameOptions,
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
                    || turnCount >= options.turnCount
                    || isATeamDefeated(board)
                );

                if (shouldStop) {
                    emit(battleFinishEvent(turnCount));
                    break;
                }

                const turnTimer = duration(options.turnDuration);

                board = simulateTurn(++turnCount, board);
                emit(battleTurnEvent(turnCount));
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
