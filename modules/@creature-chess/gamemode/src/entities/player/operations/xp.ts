import { getXpToNextLevel } from "../../../player/xp";
import { Player } from "../player";
import { playerInfoCommands } from "../state/commands";

export const addXp = (player: Player, amount: number): void => {
	let level = player.select((s) => s.playerInfo.level);
	let xp = player.select((s) => s.playerInfo.xp);

	for (let i = 0; i < amount; i++) {
		const toNextLevel = getXpToNextLevel(level);
		const newXp = xp + 1;

		if (newXp === toNextLevel) {
			xp = 0;
			level++;
		} else {
			xp = newXp;
		}
	}

	player.put(playerInfoCommands.updateLevelCommand({ level, xp }));
};
