import { GamePhase } from "./game-phase";

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
// this can be expanded for phrase to either equal a quickChatOption, or to equal a string provided by the player (non-quick chat);
export type QuickChatValue = {
	phrase: QuickChatOption;
};
