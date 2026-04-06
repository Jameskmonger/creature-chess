import { BattleEventLog } from "../battleEventLog";
import { PieceCombatState, PieceInfoStore } from "../state";

export type Stores = {
	combatStore: PieceInfoStore<PieceCombatState>;
	eventLog?: BattleEventLog;
};
