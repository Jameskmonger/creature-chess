import { all, call } from "redux-saga/effects";
import { ActionStream } from "@shoki/networking";
import { GameEvents, PlayerCommands, PlayerEvents } from "@creature-chess/gamemode";
import { GameServerToClient } from "@creature-chess/networking";

import { sendInitialState } from "./initialState";
import { getPacketRegistries } from "../registries";

export const outgoingNetworking = function*() {
	const { outgoing: registry } = yield* getPacketRegistries();

	yield all([
		call(sendInitialState),

		call(
			ActionStream.outgoingSaga<GameServerToClient.PacketSet, "sendGameEvents">(
				registry,
				"sendGameEvents",
				GameEvents.GameEventActionTypesArray
			)
		),

		call(
			ActionStream.outgoingSaga<GameServerToClient.PacketSet, "sendLocalPlayerEvents">(
				registry,
				"sendLocalPlayerEvents",
				PlayerEvents.PlayerEventActionTypesArray
			)
		),

		call(
			ActionStream.outgoingSaga<GameServerToClient.PacketSet, "playerInfoUpdates">(
				registry,
				"playerInfoUpdates",
				[
					PlayerCommands.setSpectatingIdCommand.toString(),
					PlayerCommands.updateCardsCommand.toString(),
					PlayerCommands.updateShopLockCommand.toString(),
					PlayerCommands.updateMoneyCommand.toString(),
					PlayerCommands.updateLevelCommand.toString(),
					PlayerCommands.updateHealthCommand.toString(),
					PlayerCommands.updateOpponentCommand.toString()
				]
			)
		)
	]);
};
