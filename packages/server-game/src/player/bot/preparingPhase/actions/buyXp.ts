import { PlayerActions, PlayerState } from "@creature-chess/gamemode";
import { BrainAction, BrainActionValue } from "../../brain";
import { shouldBuyXp } from "../shouldBuyXp";

// todo make this use values, rather than a flat "shouldBuyXp"
export const createBuyXpAction = (state: PlayerState): BrainAction | null => {
	if (!shouldBuyXp(state)) {
		return null;
	}

	return {
		name: "buy xp",
		action: PlayerActions.buyXpPlayerAction,
		value: BrainActionValue.MEDIUM_VALUE,
	};
};
