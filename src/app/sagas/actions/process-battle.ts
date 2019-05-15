import delay from "delay";
import { take, call, put, select, takeEvery, takeLatest, delay as delayEffect } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import { piecesUpdated } from "../../actions/pieceActions";
import { PokemonPiece, GamePhase, Constants } from "@common";
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

type BattleTurnAction = ({ type: BATTLE_TURN, payload: { pieces: PokemonPiece[] } });
export type BattleFinishAction = ({ type: BATTLE_FINISHED });
type BattleAction = BattleTurnAction | BattleFinishAction;

const turnAction = (pieces: PokemonPiece[]): BattleTurnAction => ({
    type: BATTLE_TURN,
    payload: {
        pieces
    }
});

const finishAction = (): BattleFinishAction => ({ type: BATTLE_FINISHED });

const startBattle = (startPieces: PokemonPiece[], maxTurns: number) => {
    return eventChannel<BattleAction>(emit => {
        let shouldStop = false;
        let pieces = startPieces;

        const run = async () => {
            let turnCount = 0;

            while (true) {
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

                await delay(Constants.TURN_DURATION_MS);
                turnCount++;
            }
        };

        run();

        return () => {
            shouldStop = true;
        };
    });
};

const isPlayingGamePhaseUpdate = action =>
        action.type === GAME_PHASE_UPDATE
        && (action as GamePhaseUpdateAction).payload.phase === GamePhase.PLAYING;

const isPreparingGamePhaseUpdate = action =>
        action.type === GAME_PHASE_UPDATE
        && (action as GamePhaseUpdateAction).payload.phase === GamePhase.PREPARING;

export const processBattle = function*() {
    yield takeLatest<GamePhaseUpdateAction>(
        action => isPlayingGamePhaseUpdate(action) || isPreparingGamePhaseUpdate(action),
        function*(action) {
            if (isPreparingGamePhaseUpdate(action)) {
                // don't do anything, just cancel the old one
                const pieces = (action.payload as any).payload.pieces;

                yield put(piecesUpdated(pieces));
                return;
            }

            const state: AppState = yield select();

            const battleChannel = yield call(startBattle, state.pieces, Constants.TURNS_IN_BATTLE);

            yield takeEvery(battleChannel, function*(battleAction: BattleAction) {
                switch (battleAction.type) {
                    case BATTLE_TURN:
                        yield put(piecesUpdated(battleAction.payload.pieces));
                    case BATTLE_FINISHED:
                        yield delayEffect(2000); // wait 2 seconds so it's not too jumpy
                        yield put(battleAction);
                    default:
                        return;
                }
            });
        }
    );
};
