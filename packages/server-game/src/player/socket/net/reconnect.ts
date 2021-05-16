import { Socket } from "socket.io";
import { put } from "typed-redux-saga";
import { RoundInfoState } from "@creature-chess/gamemode";
import { OutgoingPacketRegistry, ServerToClient } from "@creature-chess/networking";
import { PlayerListPlayer, } from "@creature-chess/models";
import { setSpectatingIdCommand } from "../../../../../gamemode/lib/entities/player/state/spectating";

export const reconnectPlayerSocket = function*(socket: Socket, game: RoundInfoState, players: PlayerListPlayer[]) {
	const registry = new OutgoingPacketRegistry<ServerToClient.Game.PacketDefinitions, ServerToClient.Game.PacketAcknowledgements>(
		(opcode, payload) => socket.emit(opcode, payload)
	);

	yield put(setSpectatingIdCommand(null));

	registry.emit(
		ServerToClient.Game.PacketOpcodes.GAME_CONNECTED,
		{
			game,
			players
		}
	);
};
