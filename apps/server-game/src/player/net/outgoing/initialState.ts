import { put, delay } from "redux-saga/effects";
import { select } from "typed-redux-saga";

import { PlayerCommands, PlayerStateSelectors } from "@creature-chess/gamemode";

// send a command for each of the initial states so that networking sends it out
// todo rethink this
export const sendInitialState = function* () {
	// give players time to initialise.. ugly but it works
	// todo improve this
	yield delay(200);

	const cards = yield* select(PlayerStateSelectors.getPlayerCards);
	yield put(PlayerCommands.updateCardsCommand(cards));

	const locked = yield* select(PlayerStateSelectors.isPlayerShopLocked);
	yield put(PlayerCommands.updateShopLockCommand(locked));

	const money = yield* select(PlayerStateSelectors.getPlayerMoney);
	yield put(PlayerCommands.playerInfoCommands.updateMoneyCommand(money));

	const level = yield* select(PlayerStateSelectors.getPlayerLevel);
	const xp = yield* select(PlayerStateSelectors.getPlayerXp);
	yield put(
		PlayerCommands.playerInfoCommands.updateLevelCommand({ level, xp })
	);

	const health = yield* select(PlayerStateSelectors.getPlayerHealth);
	yield put(PlayerCommands.playerInfoCommands.updateHealthCommand(health));

	const opponentId = yield* select(PlayerStateSelectors.getOpponentId);
	yield put(
		PlayerCommands.playerInfoCommands.updateOpponentCommand(opponentId)
	);
};
