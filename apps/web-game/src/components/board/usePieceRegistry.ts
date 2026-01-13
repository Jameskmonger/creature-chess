import { useSyncExternalStore } from "react";
import { PieceRegistry } from "@creature-chess/utils/piece";

export function usePieceRegistrySubscription(pieceRegistry: PieceRegistry) {
	useSyncExternalStore(pieceRegistry.subscribe, pieceRegistry.getSnapshot);
	return pieceRegistry;
}
