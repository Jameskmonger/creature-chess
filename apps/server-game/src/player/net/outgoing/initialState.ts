import delay from "delay";

import { PlayerCommands, PlayerStateSelectors } from "@creature-chess/gamemode";
import { PlayerListenerApi } from "@creature-chess/gamemode/src/entities/player/player";

// send a command for each of the initial states so that networking sends it out
// todo rethink this
export const sendInitialState = async (api: PlayerListenerApi) => {
	// give players time to initialise.. ugly but it works
	// todo improve this
	await delay(200);

	const state = api.getState();

	const cards = PlayerStateSelectors.getPlayerCards(state);
	api.dispatch(PlayerCommands.updateCardsCommand(cards));

	const locked = PlayerStateSelectors.isPlayerShopLocked(state);
	api.dispatch(PlayerCommands.updateShopLockCommand(locked));

	const money = PlayerStateSelectors.getPlayerMoney(state);
	api.dispatch(PlayerCommands.playerInfoCommands.updateMoneyCommand(money));

	const level = PlayerStateSelectors.getPlayerLevel(state);
	const xp = PlayerStateSelectors.getPlayerXp(state);
	api.dispatch(
		PlayerCommands.playerInfoCommands.updateLevelCommand({ level, xp })
	);

	const health = PlayerStateSelectors.getPlayerHealth(state);
	api.dispatch(PlayerCommands.playerInfoCommands.updateHealthCommand(health));

	const opponentId = PlayerStateSelectors.getOpponentId(state);
	const opponentIsClone = PlayerStateSelectors.getOpponentIsClone(state);
	api.dispatch(
		PlayerCommands.playerInfoCommands.updateOpponentCommand({
			id: opponentId,
			isClone: opponentIsClone,
		})
	);
};
