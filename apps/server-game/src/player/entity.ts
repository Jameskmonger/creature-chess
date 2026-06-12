import { Gamemode } from "@creature-chess/gamemode";

import { SubscribableBoard } from "@creature-chess/board";
import { PlayerProfile } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";

export const createPlayer = (
	gamemode: Gamemode,
	playerId: string,
	name: string,
	profile: PlayerProfile,
	settings: GamemodeSettings
) =>
	gamemode.createPlayer(playerId, {
		boards: {
			board: new SubscribableBoard(
				settings.boardWidth,
				settings.boardHalfHeight
			),
			bench: new SubscribableBoard(settings.benchSize, 1),
		},
		match: null,
		name,
		profile,
		finishPosition: -1,
		finishRound: -1,
	});
