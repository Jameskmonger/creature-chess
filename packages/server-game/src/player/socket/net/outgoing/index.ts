import { all, call, put, delay } from "redux-saga/effects";
import { select } from "typed-redux-saga";
import { PlayerCommands, PlayerStateSelectors } from "@creature-chess/gamemode";

import { sendGamePhaseUpdates } from "./phases";
import { sendPlayerListUpdates } from "./playerList";
import { sendPlayerInfoUpdates } from "./playerInfoUpdates";
import { sendAnnouncements } from "./announcements";

// send a command for each of the initial states so that networking sends it out
// todo rethink this
const sendInitialState = function*() {
	yield delay(100);

	const cards = yield* select(PlayerStateSelectors.getPlayerCards);
	yield put(PlayerCommands.updateCardsCommand(cards));

	const locked = yield* select(PlayerStateSelectors.isPlayerShopLocked);
	yield put(PlayerCommands.updateShopLockCommand(locked));

	const money = yield* select(PlayerStateSelectors.getPlayerMoney);
	yield put(PlayerCommands.updateMoneyCommand(money));

	const level = yield* select(PlayerStateSelectors.getPlayerLevel);
	const xp = yield* select(PlayerStateSelectors.getPlayerXp);
	yield put(PlayerCommands.updateLevelCommand({ level, xp }));

	const health = yield* select(PlayerStateSelectors.getPlayerHealth);
	yield put(PlayerCommands.updateHealthCommand(health));

	const opponentId = yield* select(PlayerStateSelectors.getOpponentId);
	yield put(PlayerCommands.updateOpponentCommand(opponentId));
};

export const outgoingNetworking = function*() {
	yield all([
		call(sendGamePhaseUpdates),
		call(sendPlayerListUpdates),
		call(sendAnnouncements),
		call(sendPlayerInfoUpdates),
		call(sendInitialState)
	]);
};
