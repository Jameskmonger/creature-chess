import { doDelete } from "./delete";
import { doHit } from "./hit";
import { doMove } from "./move";
import { ActionHandler } from "./types";

export { MoveAction, PieceAction } from "./types";

export const actionFunctions: { [key: string]: ActionHandler } = {
	move: doMove as ActionHandler,
	delete: doDelete as ActionHandler,
	hit: doHit as ActionHandler,
};
