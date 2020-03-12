import present = require("present");
import { eventChannel } from "redux-saga";
import { TurnSimulator } from "./turnSimulator";
import { Piece } from "../../models/piece";
import { isATeamDefeated } from "@common/utils";
import { BoardActions } from "../../board";
import { PiecesUpdatedAction } from "../../board/actions/boardActions";

export const BATTLE_TURN = "BATTLE_TURN";
export type BATTLE_TURN = typeof BATTLE_TURN;
export const BATTLE_FINISHED = "BATTLE_FINISHED";
export type BATTLE_FINISHED = typeof BATTLE_FINISHED;

type BattleFinishAction = ({ type: BATTLE_FINISHED, payload: { turns: number } });
export type BattleAction = PiecesUpdatedAction | BattleFinishAction;

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

export const battleEventChannel = (turnSimulator: TurnSimulator, turnDuration: number, startPieces: Piece[], maxTurns: number) => {
    return eventChannel<BattleAction>(emit => {
        let cancelled = false;
        let pieces = startPieces;

        const run = async () => {
            let turnCount = 0;

            while (true) {
                const shouldStop = (
                    cancelled
                    || turnCount >= maxTurns
                    || isATeamDefeated(pieces)
                );

                if (shouldStop) {
                    emit(finishAction(turnCount));
                    break;
                }

                const turnTimer = duration(turnDuration);

                pieces = turnSimulator.simulateTurn(++turnCount, pieces);
                emit(BoardActions.piecesUpdated(pieces));

                await turnTimer.remaining();
            }
        };

        run();

        return () => {
            cancelled = true;
        };
    });
};
