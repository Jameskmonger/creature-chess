import { networkedAction } from "@cc-plugins/api";
import { z } from "zod";

import { GamePhase } from "../game-phase";

export enum ReadyQuickChatOptions {
	GL = "GL",
	HAPPY = "😃",
	SHOCKED = "😱",
	ANGRY = "😠",
}
export enum FinishedQuickChatOptions {
	GG = "GG",
	HAPPY = "😃",
	SHOCKED = "😱",
	ANGRY = "😠",
}

type EnumValue<T> = T[keyof T];
export type QuickChatOption =
	| EnumValue<typeof ReadyQuickChatOptions>
	| EnumValue<typeof FinishedQuickChatOptions>;

export const getQuickChatOptions = (phase: GamePhase | null) => {
	if (!phase) {
		return null;
	}
	if (phase === GamePhase.READY) {
		return ReadyQuickChatOptions;
	}
	if (phase === GamePhase.PLAYING) {
		return FinishedQuickChatOptions;
	}
};

const allValues = new Set<string>([
	...Object.values(ReadyQuickChatOptions),
	...Object.values(FinishedQuickChatOptions),
]);

const quickChatValueSchema = z.custom<QuickChatOption>(
	(v) => typeof v === "string" && allValues.has(v as string),
	{ message: "invalid chat value" }
);

export type QuickChatActionPayload = {
	sendingPlayerId: string | null;
	chatValue: QuickChatOption;
};

export const quickChatPlayerActionSchema = z.object({
	sendingPlayerId: z.string().nullable(),
	chatValue: quickChatValueSchema,
});

export type QuickChatPlayerAction = ReturnType<typeof quickChatPlayerAction>;
export const quickChatPlayerAction = networkedAction<
	QuickChatActionPayload,
	"quickChatPlayerAction"
>("quickChatPlayerAction", quickChatPlayerActionSchema);

export const playerReceiveQuickChatEventSchema = z.object({
	sendingPlayerId: z.string(),
	chatValue: quickChatValueSchema,
});

export type PlayerReceiveQuickChatEvent = ReturnType<
	typeof playerReceiveQuickChatEvent
>;
export const playerReceiveQuickChatEvent = networkedAction<
	{ sendingPlayerId: string; chatValue: QuickChatOption },
	"playerReceiveQuickChatEvent"
>("playerReceiveQuickChatEvent", playerReceiveQuickChatEventSchema);
