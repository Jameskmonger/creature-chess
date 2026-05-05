import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import { PlayerStatus } from "@creature-chess/models";

import { playerInfoCommands } from "../entities/player/state/commands";
import { definePlayerAction } from "./registry";

export type QuitGamePlayerAction = ReturnType<typeof quitGamePlayerAction>;
export const quitGamePlayerAction = createAction("quitGamePlayerAction");

export const quitGameDef = definePlayerAction({
	type: quitGamePlayerAction.type,
	schema: z.undefined(),
	handler: (player) => {
		// Server-side observers (socket teardown, readyNotifier) listen for the
		// action via Player listeners; dispatch it for them.
		player.put(quitGamePlayerAction());
		player.put(playerInfoCommands.updateStatusCommand(PlayerStatus.QUIT));
	},
});
