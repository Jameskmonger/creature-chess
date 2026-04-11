import { useSyncExternalStore } from "react";

import { PieceRegistry } from "@creature-chess/utils";

export function usePieceRegistrySubscription(pieceRegistry: PieceRegistry) {
	useSyncExternalStore(pieceRegistry.subscribe, pieceRegistry.getSnapshot);
	return pieceRegistry;
}
