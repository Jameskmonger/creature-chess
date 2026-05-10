import { GamePhase } from "@creature-chess/models";

export type BoardSurfaceConfig = {
	isMatch: boolean;
	isPreparing: boolean;
	isInteractive: boolean;
};

export function getBoardSurfaceConfig(input: {
	phase: GamePhase | null;
	spectatingId: string | null;
}): BoardSurfaceConfig {
	const isMatch =
		input.phase === GamePhase.READY || input.phase === GamePhase.PLAYING;

	return {
		isMatch,
		isPreparing: !isMatch,
		isInteractive: input.spectatingId === null,
	};
}
