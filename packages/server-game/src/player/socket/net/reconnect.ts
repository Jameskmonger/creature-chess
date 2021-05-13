import { Socket } from "socket.io";
import { getContext, select } from "typed-redux-saga";
import { PlayerSagaContext, PlayerSelectors, RoundInfoState } from "@creature-chess/gamemode";
import { OutgoingPacketRegistry, ServerToClient } from "@creature-chess/networking";
import { PlayerListPlayer, } from "@creature-chess/models";

export const reconnectPlayerSocket = function*(socket: Socket, game: RoundInfoState, players: PlayerListPlayer[]) {
	const playerId = yield* getContext<string>("playerId");
	const { getMatch } = yield* getContext<PlayerSagaContext.PlayerSagaDependencies>("dependencies");

	const registry = new OutgoingPacketRegistry<ServerToClient.Game.PacketDefinitions, ServerToClient.Game.PacketAcknowledgements>(
		(opcode, payload) => socket.emit(opcode, payload)
	);

	const match = getMatch();
	const board = match ? match.getBoardForPlayer(playerId) : yield* select(PlayerSelectors.getPlayerBoard);
	const opponentId = match ? match.away.id : null;
	const battleTurn = match ? match.getTurn() : null;

	registry.emit(
		ServerToClient.Game.PacketOpcodes.GAME_CONNECTED,
		{
			board,
			bench: yield* select(PlayerSelectors.getPlayerBench),
			game,
			players,
			battleTurn,
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
