import delay from "delay";
import { eventChannel } from "redux-saga";
import { TurnSimulator } from "./turnSimulator";
import { Piece } from "../../models/piece";
import { log } from "../../../app/log";
import { isATeamDefeated } from "../../is-a-team-defeated";
import { BoardActions } from "../../board";
import { PiecesUpdatedAction } from "../../board/actions/boardActions";

export const BATTLE_TURN = "BATTLE_TURN";
export type BATTLE_TURN = typeof BATTLE_TURN;
export const BATTLE_FINISHED = "BATTLE_FINISHED";
export type BATTLE_FINISHED = typeof BATTLE_FINISHED;

type BattleFinishAction = ({ type: BATTLE_FINISHED });
export type BattleAction = PiecesUpdatedAction | BattleFinishAction;

const finishAction = (): BattleFinishAction => ({ type: BATTLE_FINISHED });

export const battleEventChannel = (turnSimulator: TurnSimulator, turnDuration: number, startPieces: Piece[], maxTurns: number) => {
    return eventChannel<BattleAction>(emit => {
        let shouldStop = false;
        let pieces = startPieces;

        const run = async () => {
            let turnCount = 0;

            while (true) {
                await delay(turnDuration);

                const defeated = isATeamDefeated(pieces);

                if (shouldStop) {
                    log(`Fight ended at turn ${turnCount} due to cancellation`);
                    emit(finishAction());
                    break;
                }

                if (defeated) {
                    log(`Fight ended at turn ${turnCount}`);
                    emit(finishAction());
                    break;
                }

                if (turnCount >= maxTurns) {
                    log(`Fight timed out at turn ${turnCount}`);
                    emit(finishAction());
                    break;
                }

                pieces = turnSimulator.simulateTurn(pieces);
                emit(BoardActions.piecesUpdated(pieces));
                turnCount++;
            }
        };

        run();

        return () => {
            shouldStop = true;
        };
    });
};
