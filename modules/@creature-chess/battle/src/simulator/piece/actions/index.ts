import { doMove } from "./move";
import { ActionFunction } from "./types";

export { MoveAction, PieceAction } from "./types";

export const actionFunctions: { [key: string]: ActionFunction } = {
	move: doMove,
};
