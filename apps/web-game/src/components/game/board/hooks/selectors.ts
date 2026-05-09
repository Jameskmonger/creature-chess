import { useBoardSubscription } from "~/components/board/useBoard";
import { usePieceRegistrySubscription } from "~/components/board/usePieceRegistry";
import { useGameSession } from "~/game/sessionContext";

export function useGameBoard() {
	const { board } = useGameSession();

	return useBoardSubscription(board);
}

export function useGameBench() {
	const { bench } = useGameSession();

	return useBoardSubscription(bench);
}

export function useGameMatchBoard() {
	const { matchBoard } = useGameSession();

	return useBoardSubscription(matchBoard);
}

export function useGamePieceRegistry() {
	const { pieceRegistry } = useGameSession();

	return usePieceRegistrySubscription(pieceRegistry);
}

export function useGameAnimationEventStore() {
	const { animationEventStore } = useGameSession();

	return animationEventStore;
}
