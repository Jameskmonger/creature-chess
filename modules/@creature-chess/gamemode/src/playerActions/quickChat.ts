import { createAction } from "@reduxjs/toolkit";
import { z } from "zod";

import {
	FinishedQuickChatOptions,
	QuickChatOption,
	ReadyQuickChatOptions,
} from "@creature-chess/models";

import { definePlayerAction } from "./registry";

const quickChatOptions = new Set<QuickChatOption>([
	...Object.values(ReadyQuickChatOptions),
	...Object.values(FinishedQuickChatOptions),
]);

const quickChatSchema = z.object({
	sendingPlayerId: z.string().nullable(),
	chatValue: z.custom<QuickChatOption>(
		(v) => typeof v === "string" && quickChatOptions.has(v as QuickChatOption),
		{ message: "invalid chat value" }
	),
});

export type QuickChatPlayerAction = ReturnType<typeof quickChatPlayerAction>;
export const quickChatPlayerAction = createAction<
	z.infer<typeof quickChatSchema>,
	"quickChatAction"
>("quickChatAction");

export const quickChatDef = definePlayerAction({
	type: quickChatPlayerAction.type,
	schema: quickChatSchema,
	handler: (player, { sendingPlayerId, chatValue }) => {
		if (sendingPlayerId === null) {
			return;
		}

		const game = player.gamemode;
		const sender = game.getPlayerById(sendingPlayerId);
		const opponentId = player.opponentId;
		if (!opponentId) {
			return;
		}

		const opponent = game.getPlayerById(opponentId);
		if (!opponent || !sender) {
			return;
		}

		const event = { sendingPlayerId, chatValue };
		opponent.emitReceiveQuickChat(event);
		sender.emitReceiveQuickChat(event);
	},
});
