import { PlayerActions } from "@creature-chess/gamemode";
import { put } from "@redux-saga/core/effects";
import { select } from "redux-saga/effects";
import { PlayerState } from "@creature-chess/gamemode";
import { getOpponentId } from "../../../../gamemode/lib/entities/player/state/selectors";
import { QuickChatOption } from "../../../../models/lib";


export const readyPhase = function*() {
	const id: string = yield select((state: PlayerState) => getOpponentId(state));
	id
	const opponentId = getOpponentId(id);
	yield put(PlayerActions.quickChatPlayerAction({ sendingPlayerId: id, chatValue: QuickChatOption.GL }));

};
