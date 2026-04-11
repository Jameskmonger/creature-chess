import { useSyncExternalStore } from "react";

import type { SubscribableBoard } from "@creature-chess/board";

export function useBoardSubscription(board: SubscribableBoard) {
	useSyncExternalStore(board.subscribe, board.getSnapshot);
	return board;
}
