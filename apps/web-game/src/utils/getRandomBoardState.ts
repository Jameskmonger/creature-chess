import { SubscribableBoard } from "@creature-chess/board";

export function getRandomBoardState(id: string, minPieces = 3): SubscribableBoard {
	return new SubscribableBoard(8, 8);
}
