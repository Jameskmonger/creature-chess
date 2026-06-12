import { CreatureLookup } from "@creature-chess/models";

import { BattleEventLog } from "../battleEventLog";
import { PieceCombatState, PieceInfoStore } from "../state";

export type Stores = {
	combatStore: PieceInfoStore<PieceCombatState>;
	creatures: CreatureLookup;
	eventLog?: BattleEventLog;
};
