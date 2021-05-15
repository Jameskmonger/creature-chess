import { Socket } from "socket.io";
import { select, put } from "typed-redux-saga";
import { getVariable } from "@shoki/engine";
import { PlayerVariables, PlayerSelectors, RoundInfoState, Match } from "@creature-chess/gamemode";
import { OutgoingPacketRegistry, ServerToClient } from "@creature-chess/networking";
import { PlayerListPlayer, } from "@creature-chess/models";
import { setSpectatingIdCommand } from "../../../../../gamemode/lib/entities/player/state/spectating";

export const reconnectPlayerSocket = function*(socket: Socket, game: RoundInfoState, players: PlayerListPlayer[]) {
	const registry = new OutgoingPacketRegistry<ServerToClient.Game.PacketDefinitions, ServerToClient.Game.PacketAcknowledgements>(
		(opcode, payload) => socket.emit(opcode, payload)
	);

	yield put(setSpectatingIdCommand(null));

	const currentMatch = yield* getVariable<PlayerVariables, Match>(variables => variables.match!);
	const opponentId = currentMatch?.away.id ?? null;

	registry.emit(
		ServerToClient.Game.PacketOpcodes.GAME_CONNECTED,
		{
			game,
			players,
			playerInfo: {
				cards: yield* select(PlayerSelectors.getPlayerCards),
				health: yield* select(PlayerSelectors.getPlayerHealth),
				level: yield* select(PlayerSelectors.getPlayerLevel),
				xp: yield* select(PlayerSelectors.getPlayerXp),
				money: yield* select(PlayerSelectors.getPlayerMoney),
				opponentId,
				shopLocked: yield* select(PlayerSelectors.isPlayerShopLocked)
			}
		}
	);
};
