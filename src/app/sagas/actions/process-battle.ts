import delay from "delay";
import { take, call, put, select, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import { piecesUpdated } from "../../actions/pieceActions";
import { PokemonPiece, GamePhase } from "@common";
import { isATeamDefeated } from "@common/is-a-team-defeated";
import { simulateTurn } from "@common/fighting-turn-simulator";
import { AppState } from "../../store/store";
import { GAME_PHASE_UPDATE } from "../../actiontypes/gameActionTypes";
import { PhaseUpdatePacket } from "../../../shared/packet-opcodes";
import { GamePhaseUpdateAction } from "../../actions/gameActions";

const startBattle = (startPieces: PokemonPiece[]) => {
    return eventChannel(emit => {
        let shouldStop = false;
        let pieces = startPieces;
        const turnDurationMs = 50;

        const run = async () => {
            while (shouldStop === false && isATeamDefeated(pieces) === false) {
                await delay(turnDurationMs);
                pieces = simulateTurn(pieces);
                emit(pieces);
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
                const pieces = (action.payload.payload as any).pieces;

                yield put(piecesUpdated(pieces));
                return;
            }

            const state: AppState = yield select();

            const battleChannel = yield call(startBattle, state.pieces);

            yield takeEvery(battleChannel, function*(newPieces: PokemonPiece[]) {
                yield put(piecesUpdated(newPieces));
            });
        }
    );
};
