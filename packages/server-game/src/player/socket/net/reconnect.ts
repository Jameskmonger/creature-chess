import { Socket } from "socket.io";
import { put } from "typed-redux-saga";
import { RoundInfoState, PlayerCommands } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { PlayerListPlayer, } from "@creature-chess/models";

export const reconnectPlayerSocket = function*(socket: Socket, game: RoundInfoState, players: PlayerListPlayer[]) {
	const registry = ServerToClient.Game.createOutgoingRegistry(
		(opcode, payload, ack) => socket.emit(opcode, payload, ack)
	);

	yield put(PlayerCommands.setSpectatingIdCommand(null));

	registry.emit(
		ServerToClient.Game.PacketOpcodes.GAME_CONNECTED,
		{
			game,
			players
		}
	);
};
