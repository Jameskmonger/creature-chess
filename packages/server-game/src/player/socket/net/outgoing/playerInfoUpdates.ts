import { call } from "typed-redux-saga";

import { emitActionsSaga } from "@shoki/networking";
import { PlayerInfoCommands, PlayerCommands } from "@creature-chess/gamemode";
import { getPacketRegistries } from "../registries";

export const sendPlayerInfoUpdates = function*() {
	const { outgoing: registry } = yield* getPacketRegistries();

	yield* call(
		emitActionsSaga,
		registry,
		[
			PlayerCommands.setSpectatingIdCommand.toString(),
			PlayerCommands.updateCardsCommand.toString(),
			PlayerCommands.updateShopLockCommand.toString(),
			PlayerInfoCommands.updateMoneyCommand.toString(),
			PlayerInfoCommands.updateLevelCommand.toString(),
			PlayerInfoCommands.updateHealthCommand.toString(),
			PlayerInfoCommands.updateOpponentCommand.toString()
		]
	);
};
