import { useSelector } from "react-redux";
import { useBoardSubscription } from "~/components/board/useBoard";
import { usePieceRegistrySubscription } from "~/components/board/usePieceRegistry";
import { AppState } from "~/store";

import { useGameBoards } from "../state";

export function useGameBoard() {
	const { board } = useGameBoards();

	return useBoardSubscription(board);
}

export function useGameBench() {
	const { bench } = useGameBoards();

	return useBoardSubscription(bench);
}

export function useGameMatchBoard() {
	const { matchBoard } = useGameBoards();

	return useBoardSubscription(matchBoard);
}

export function useGamePieceRegistry() {
	const { pieceRegistry } = useGameBoards();

	return usePieceRegistrySubscription(pieceRegistry);
}

export function useGameAnimationEventStore() {
	const { animationEventStore } = useGameBoards();

	return animationEventStore;
}
