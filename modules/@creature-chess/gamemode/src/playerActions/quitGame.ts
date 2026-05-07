import { z } from "zod";

import { PlayerStatus } from "@creature-chess/models";

import { networkedAction } from "../events/networkedAction";
import { definePlayerAction } from "./registry";

export type QuitGamePlayerAction = ReturnType<typeof quitGamePlayerAction>;
export const quitGamePlayerAction = networkedAction("quitGamePlayerAction");

export const quitGameDef = definePlayerAction({
	type: quitGamePlayerAction.type,
	schema: z.undefined(),
	handler: (player) => {
		player.setStatus(PlayerStatus.QUIT);
	},
});
