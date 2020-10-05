import present = require("present");
import { eventChannel, buffers } from "redux-saga";
import { TurnSimulator } from "./turnSimulator";
import { isATeamDefeated } from "../../utils";
import { BoardState } from "../../board";
import { initialiseBoard, InitialiseBoardAction } from "../../board/actions/boardActions";
import { IndexedPieces } from "@creature-chess/models/src/piece";

export const BATTLE_TURN = "BATTLE_TURN";
export type BATTLE_TURN = typeof BATTLE_TURN;
export const BATTLE_FINISHED = "BATTLE_FINISHED";
export type BATTLE_FINISHED = typeof BATTLE_FINISHED;

type BattleFinishAction = ({ type: BATTLE_FINISHED, payload: { turns: number } });
export type BattleAction = InitialiseBoardAction | BattleFinishAction;

const finishAction = (turns: number): BattleFinishAction => ({ type: BATTLE_FINISHED, payload: { turns } });

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
    return eventChannel<BattleAction>(emit => {
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
                    emit(finishAction(turnCount));
                    break;
                }

                const turnTimer = duration(turnDuration);

                board = turnSimulator.simulateTurn(++turnCount, board);
                emit(initialiseBoard(board.pieces));

                await turnTimer.remaining();
            }
        };

        run();

        return () => {
            cancelled = true;
        };
    }, buffers.expanding(bufferSize));
};
