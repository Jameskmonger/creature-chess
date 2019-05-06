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

export const processBattle = function*() {
    yield takeLatest<GamePhaseUpdateAction>(
        action =>
            action.type === "GAME_STATE_UPDATE"
            && (action as GamePhaseUpdateAction).payload.phase === GamePhase.PLAYING,
        function*() {
            const state: AppState = yield select();

            const battleChannel = yield call(startBattle, state.pieces);

            yield takeEvery(battleChannel, function*(newPieces: PokemonPiece[]) {
                yield put(piecesUpdated(newPieces));
            });
        }
    );
};
