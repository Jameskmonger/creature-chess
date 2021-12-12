import { Socket } from "socket.io";
import { put } from "typed-redux-saga";
import { PlayerCommands } from "@creature-chess/gamemode";
import { GameServerToClient } from "@creature-chess/networking";
import { PlayerListPlayer, RoundInfoState } from "@creature-chess/models";

export const reconnectPlayerSocket = function*(socket: Socket, game: RoundInfoState, players: PlayerListPlayer[]) {
	const registry = GameServerToClient.outgoing(
		(opcode, payload, ack) => socket.emit(opcode, payload, ack)
	);

	yield put(PlayerCommands.setSpectatingIdCommand(null));

	registry.send(
		"gameConnected",
		{
			game,
			players
		}
	);
};
