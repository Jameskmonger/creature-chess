import delay from "delay";
import { take, call, put, select, takeEvery, takeLatest, delay as delayEffect } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import { BoardActions } from "@common/board";
import { Models, GamePhase, Constants } from "@common";
import { isATeamDefeated } from "@common/is-a-team-defeated";
import { simulateTurn } from "@common/fighting-turn-simulator";
import { AppState } from "../../store/store";
import { GAME_PHASE_UPDATE } from "../../actiontypes/gameActionTypes";
import { GamePhaseUpdateAction } from "../../actions/gameActions";
import { log } from "../../log";

enum BattleActionType {
    TURN,
    FINISH
}

const BATTLE_TURN = "BATTLE_TURN";
type BATTLE_TURN = typeof BATTLE_TURN;
export const BATTLE_FINISHED = "BATTLE_FINISHED";
export type BATTLE_FINISHED = typeof BATTLE_FINISHED;

type BattleTurnAction = ({ type: BATTLE_TURN, payload: { pieces: Models.Piece[] } });
export type BattleFinishAction = ({ type: BATTLE_FINISHED });
type BattleAction = BattleTurnAction | BattleFinishAction;

const turnAction = (pieces: Models.Piece[]): BattleTurnAction => ({
    type: BATTLE_TURN,
    payload: {
        pieces
    }
});

const finishAction = (): BattleFinishAction => ({ type: BATTLE_FINISHED });

const startBattle = (startPieces: Models.Piece[], maxTurns: number) => {
    return eventChannel<BattleAction>(emit => {
        let shouldStop = false;
        let pieces = startPieces;

        const run = async () => {
            let turnCount = 0;

            while (true) {
                await delay(Constants.TURN_DURATION_MS);

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

                pieces = simulateTurn(pieces);
                emit(turnAction(pieces));
                turnCount++;
            }
        };

        run();

        return () => {
            shouldStop = true;
        };
    });
};

const isGamePhaseUpdate = (phase: GamePhase, action: GamePhaseUpdateAction) =>
    action.type === GAME_PHASE_UPDATE && action.payload.phase === phase;

export const processBattle = function*() {
    yield takeLatest<GamePhaseUpdateAction>(
        action =>
            isGamePhaseUpdate(GamePhase.PLAYING, action)
            || isGamePhaseUpdate(GamePhase.PREPARING, action)
            || isGamePhaseUpdate(GamePhase.READY, action),
        function*(action) {
            if (isGamePhaseUpdate(GamePhase.PREPARING, action) || isGamePhaseUpdate(GamePhase.READY, action)) {
                // don't do anything, just cancel the old one
                const pieces = (action.payload as any).payload.pieces;

                yield put(BoardActions.piecesUpdated(pieces));
                return;
            }

            const state: AppState = yield select();

            const battleChannel = yield call(startBattle, state.board, Constants.TURNS_IN_BATTLE);

            yield takeEvery(battleChannel, function*(battleAction: BattleAction) {
                switch (battleAction.type) {
                    case BATTLE_TURN:
                        yield put(BoardActions.piecesUpdated(battleAction.payload.pieces));
                    case BATTLE_FINISHED:
                        yield put(battleAction);
                    default:
                        return;
                }
            });
        }
    );
};
