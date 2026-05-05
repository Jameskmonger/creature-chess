import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import { PlayerStatus } from "@creature-chess/models";

import { definePlayerAction } from "./registry";

export type QuitGamePlayerAction = ReturnType<typeof quitGamePlayerAction>;
export const quitGamePlayerAction = createAction("quitGamePlayerAction");

export const quitGameDef = definePlayerAction({
	type: quitGamePlayerAction.type,
	schema: z.undefined(),
	handler: (player) => {
		player.setStatus(PlayerStatus.QUIT);
	},
});
