import delay from "delay";

import { PlayerListenerApi } from "@creature-chess/gamemode";

// Send a command for each of the initial states so that networking sends it out.
// todo rethink this
export const sendInitialState = async (api: PlayerListenerApi) => {
	// give players time to initialise.. ugly but it works
	// todo improve this
	await delay(200);

	const player = api.player;

	player.setCards(player.cards);
	player.setShopLocked(player.shopLocked);
	player.setMoney(player.money);
	player.setLevel({ level: player.level, xp: player.xp });
	player.setHealth(player.health);
	player.setOpponent({
		id: player.opponentId,
		isClone: player.opponentIsClone,
	});
};
