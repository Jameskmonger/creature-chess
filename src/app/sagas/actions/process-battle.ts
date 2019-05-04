import delay from "delay";
import { take, call, put, select, takeEvery } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import { GAME_STATE_PLAYING } from "../../actiontypes/gameActionTypes";
import { piecesUpdated } from "../../actions/pieceActions";
import { PokemonPiece } from "../../../shared";
import { isATeamDefeated } from "../../../shared/is-a-team-defeated";
import { simulateTurn } from "../../../shared/fighting-turn-simulator";
import { AppState } from "../../store/store";

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
    yield take(GAME_STATE_PLAYING);

    const state: AppState = yield select();

    const battleChannel = yield call(startBattle, state.pieces);

    yield takeEvery(battleChannel, function*(newPieces: PokemonPiece[]) {
        yield put(piecesUpdated(newPieces));
    });
};
