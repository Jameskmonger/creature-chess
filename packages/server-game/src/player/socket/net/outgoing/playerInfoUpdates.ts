import { call } from "typed-redux-saga";

import { emitActionsSaga } from "@shoki/networking";
import { PlayerCommands } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { getPacketRegistries } from "../registries";

export const sendPlayerInfoUpdates = function*() {
	const { outgoing: registry } = yield* getPacketRegistries();

	yield* call(
		emitActionsSaga as any, // todo improve this typing
		ServerToClient.Game.PacketOpcodes.PLAYER_INFO_UPDATES,
		registry,
		[
			PlayerCommands.setSpectatingIdCommand.toString(),
			PlayerCommands.updateCardsCommand.toString(),
			PlayerCommands.updateShopLockCommand.toString(),
			PlayerCommands.updateMoneyCommand.toString(),
			PlayerCommands.updateLevelCommand.toString(),
			PlayerCommands.updateHealthCommand.toString(),
			PlayerCommands.updateOpponentCommand.toString()
		]
	);
};
