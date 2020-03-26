import present = require("present");
import { eventChannel, buffers } from "redux-saga";
import { TurnSimulator } from "./turnSimulator";
import { Piece } from "../../models/piece";
import { isATeamDefeated } from "@common/utils";
import { BoardActions, BoardState } from "../../board";
import { initialiseBoard } from "@common/board/actions/boardActions";
// import { UpdatePiecesAction } from "../../board/actions/boardActions";
type UpdatePiecesAction = any;

export const BATTLE_TURN = "BATTLE_TURN";
export type BATTLE_TURN = typeof BATTLE_TURN;
export const BATTLE_FINISHED = "BATTLE_FINISHED";
export type BATTLE_FINISHED = typeof BATTLE_FINISHED;

type BattleFinishAction = ({ type: BATTLE_FINISHED, payload: { turns: number } });
export type BattleAction = UpdatePiecesAction | BattleFinishAction;

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

export const battleEventChannel = (
    turnSimulator: TurnSimulator,
    turnDuration: number,
    startingBoardState: BoardState,
    maxTurns: number,
    bufferSize: number
) => {
    return eventChannel<BattleAction>(emit => {
        let cancelled = false;

        let pieces = { ...startingBoardState.pieces };

        const run = async () => {
            let turnCount = 0;

            while (true) {
                const shouldStop = (
                    cancelled
                    || turnCount >= maxTurns
                    || isATeamDefeated(Object.values(pieces))
                );

                if (shouldStop) {
                    emit(finishAction(turnCount));
                    break;
                }

                const turnTimer = duration(turnDuration);

                pieces = turnSimulator.simulateTurn(++turnCount, pieces);
                emit(initialiseBoard(pieces));

                await turnTimer.remaining();
            }
        };

        run();

        return () => {
            cancelled = true;
        };
    }, buffers.expanding(bufferSize));
};
