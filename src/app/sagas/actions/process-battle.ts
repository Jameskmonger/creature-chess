import delay from "delay";
import { take, call, put, select, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import { piecesUpdated } from "../../actions/pieceActions";
import { PokemonPiece, GamePhase, Constants } from "@common";
import { isATeamDefeated } from "@common/is-a-team-defeated";
import { simulateTurn } from "@common/fighting-turn-simulator";
import { AppState } from "../../store/store";
import { GAME_PHASE_UPDATE } from "../../actiontypes/gameActionTypes";
import { GamePhaseUpdateAction } from "../../actions/gameActions";
import { log } from "../../log";

const startBattle = (startPieces: PokemonPiece[], maxTurns: number) => {
    return eventChannel(emit => {
        let shouldStop = false;
        let pieces = startPieces;

        const run = async () => {
            let turnCount = 0;

            while (true) {
                const defeated = isATeamDefeated(pieces);

                if (shouldStop) {
                    log(`Fight ended at turn ${turnCount} due to cancellation`);
                    break;
                }

                if (defeated) {
                    log(`Fight ended at turn ${turnCount}`);
                    break;
                }

                if (turnCount >= maxTurns) {
                    log(`Fight timed out at turn ${turnCount}`);
                    break;
                }

                pieces = simulateTurn(pieces);
                emit(pieces);

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

            yield takeEvery(battleChannel, function*(newPieces: PokemonPiece[]) {
                yield put(piecesUpdated(newPieces));
            });
        }
    );
};
