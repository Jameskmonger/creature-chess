import { GamePhase } from "@creature-chess/models";

export type BoardSurfaceConfig = {
	isMatch: boolean;
	isPreparing: boolean;
	isInteractive: boolean;
	boardDraggable: boolean;
	benchDraggable: boolean;
};

export function getBoardSurfaceConfig(input: {
	phase: GamePhase | null;
	spectatingId: string | null;
}): BoardSurfaceConfig {
	const isMatch =
		input.phase === GamePhase.READY || input.phase === GamePhase.PLAYING;
	const isInteractive = input.spectatingId === null;

	return {
		isMatch,
		isPreparing: !isMatch,
		isInteractive,
		boardDraggable: isInteractive && !isMatch,
		benchDraggable: isInteractive,
	};
}
