import { put, take } from "typed-redux-saga";
import { setWinnerIdCommand } from "~/store/game/ui/actions";

import { GameEvents } from "@creature-chess/gamemode";

export const finishGame = function* () {
	const event = yield* take<GameEvents.GameFinishEvent>(
		GameEvents.gameFinishEvent.toString()
	);

	const winner = event.payload.players.find((p) => p.position === 0);

	if (winner) {
		yield put(setWinnerIdCommand({ winnerId: winner.id }));
	}
};
