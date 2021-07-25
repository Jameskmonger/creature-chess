export enum QuickChatOption {
	GL = "GL",
	HAPPY = "😃",
	SHOCKED = "😱",
	ANGRY = "😠"
}
// this can be expanded for phrase to either equal a quickChatOption, or to equal a string provided by the player (non-quick chat);
export type QuickChatValue = {
	phrase: QuickChatOption;
};
