import { Logger } from "winston";
import { takeLatest, take, fork, all, select, delay } from "@redux-saga/core/effects";
import { Socket } from "socket.io";
import {
    PlayerActions, PlayerState, PlayerInfoCommands, PlayerCommands, GameEvents, PlayerEvents, Match,
} from "@creature-chess/gamemode";

import { ServerToClient, OutgoingPacketRegistry } from "@creature-chess/networking";

import { BoardState, BoardSlice } from "@creature-chess/board";
import { NewPlayerSocketEvent, NEW_PLAYER_SOCKET_EVENT } from "../events";
import { Card, GamePhase } from "@creature-chess/models";

type OutgoingRegistry = OutgoingPacketRegistry<ServerToClient.Game.PacketDefinitions, ServerToClient.Game.PacketAcknowledgements>;

export const outgoingNetworking = function*(
    getLogger: () => Logger,
    playerId: string,
    getCurrentMatch: () => Match,
    { benchSlice, boardSlice }: { benchSlice: BoardSlice, boardSlice: BoardSlice }
) {
    let registry: OutgoingRegistry;
    let socket: Socket;

    const sendGamePhaseUpdates = function*() {
        yield takeLatest<GameEvents.GamePhaseStartedEvent>(
            GameEvents.gamePhaseStartedEvent.toString(),
            function*({ payload: { phase, startedAt, round } }) {
                if (phase === GamePhase.PREPARING) {
                    const { board, bench, cardShop: { cards } }: PlayerState = yield select();

                    const packet: ServerToClient.Game.PhaseUpdatePacket = {
                        startedAtSeconds: startedAt,
                        phase: GamePhase.PREPARING,
                        payload: {
                            round,
                            pieces: {
                                board,
                                bench
                            },
                            cards
                        }
                    };

                    registry.emit(ServerToClient.Game.PacketOpcodes.PHASE_UPDATE, packet);
                } else if (phase === GamePhase.READY) {
                    const { bench, playerInfo: { health } }: PlayerState = yield select();

                    // todo this isn't nice, get it in state?
                    const match = getCurrentMatch();

                    if (!match) {
                        if (health > 0) {
                            getLogger().warn("No match found for living player when entering ready state");
                        }

                        return;
                    }

                    const board = match.getBoardForPlayer(playerId);

                    const opponentId =
                        match.home.id === playerId
                            ? match.away.id
                            : match.home.id;

                    const packet: ServerToClient.Game.PhaseUpdatePacket = {
                        startedAtSeconds: startedAt,
                        phase: GamePhase.READY,
                        payload: {
                            bench,
                            board,
                            opponentId
                        }
                    };

                    registry.emit(ServerToClient.Game.PacketOpcodes.PHASE_UPDATE, packet);
                } else if (phase === GamePhase.PLAYING) {
                    const packet: ServerToClient.Game.PhaseUpdatePacket = { startedAtSeconds: startedAt, phase: GamePhase.PLAYING };

                    registry.emit(ServerToClient.Game.PacketOpcodes.PHASE_UPDATE, packet);
                }
            }
        );
    };

    const sendAnnouncements = function*() {
        yield all([
            takeLatest<PlayerEvents.PlayerDeathEvent>(
                PlayerEvents.PLAYER_DEATH_EVENT,
                function*() {
                    registry.emit(ServerToClient.Game.PacketOpcodes.PLAYER_DEAD, { empty: true });
                }
            ),
            takeLatest<PlayerEvents.PlayerMatchRewardsEvent>(
                PlayerEvents.PLAYER_MATCH_REWARDS_EVENT,
                function*({ payload }: PlayerEvents.PlayerMatchRewardsEvent) {
                    registry.emit(ServerToClient.Game.PacketOpcodes.MATCH_REWARDS, payload);
                }
            ),
            takeLatest<GameEvents.GameFinishEvent>(
                GameEvents.gameFinishEvent.toString(),
                function*({ payload: { winnerName } }) {
                    registry.emit(ServerToClient.Game.PacketOpcodes.FINISH_GAME, { winnerName });
                }
            )
        ]);
    };

    const sendPlayerListUpdates = function*() {
        yield takeLatest<GameEvents.PlayerListChangedEvent>(
            GameEvents.playerListChangedEvent.toString(),
            function*({ payload: { players } }) {
                registry.emit(ServerToClient.Game.PacketOpcodes.PLAYER_LIST_UPDATE, players);
            }
        );
    };

    const sendCommands = function*() {
        yield all([
            yield takeLatest(
                [
                    benchSlice.commands.addBoardPieceCommand,
                    benchSlice.commands.moveBoardPieceCommand,
                    benchSlice.commands.removeBoardPiecesCommand,
                    benchSlice.commands.updateBoardPiecesCommand
                ],
                function*() {
                    const bench: BoardState = yield select((state: PlayerState) => state.bench);

                    registry.emit(ServerToClient.Game.PacketOpcodes.BENCH_UPDATE, { state: bench });
                }
            ),
            yield takeLatest(
                [
                    boardSlice.commands.addBoardPieceCommand,
                    boardSlice.commands.moveBoardPieceCommand,
                    boardSlice.commands.removeBoardPiecesCommand,
                    boardSlice.commands.updateBoardPiecesCommand
                ],
                function*() {
                    const board: BoardState = yield select((state: PlayerState) => state.board);

                    registry.emit(ServerToClient.Game.PacketOpcodes.BOARD_UPDATE, { state: board });
                }
            ),

            yield takeLatest(
                PlayerCommands.updateCardsCommand,
                function*() {
                    const cards: Card[] = yield select((state: PlayerState) => state.cardShop.cards);

                    registry.emit(ServerToClient.Game.PacketOpcodes.CARDS_UPDATE, cards);
                }
            ),
            yield takeLatest(
                PlayerCommands.updateShopLockCommand,
                function*() {
                    const locked: boolean = yield select((state: PlayerState) => state.cardShop.locked);

                    registry.emit(ServerToClient.Game.PacketOpcodes.SHOP_LOCK_UPDATE, { locked });
                }
            ),
            yield takeLatest<PlayerInfoCommands.UpdateMoneyCommand>(
                PlayerInfoCommands.UPDATE_MONEY_COMMAND,
                function*() {
                    const money: number = yield select((state: PlayerState) => state.playerInfo.money);

                    registry.emit(ServerToClient.Game.PacketOpcodes.MONEY_UPDATE, money);
                }
            ),
            yield takeLatest<PlayerInfoCommands.UpdateLevelCommand>(
                PlayerInfoCommands.UPDATE_LEVEL_COMMAND,
                function*() {
                    const level: number = yield select((state: PlayerState) => state.playerInfo.level);
                    const xp: number = yield select((state: PlayerState) => state.playerInfo.xp);

                    registry.emit(ServerToClient.Game.PacketOpcodes.LEVEL_UPDATE, { level, xp });
                }
            ),
            yield takeLatest<PlayerInfoCommands.UpdateHealthCommand>(
                PlayerInfoCommands.UPDATE_HEALTH_COMMAND,
                function*() {
                    const health: number = yield select((state: PlayerState) => state.playerInfo.health);

                    registry.emit(ServerToClient.Game.PacketOpcodes.HEALTH_UPDATE, health);
                }
            )
        ]);
    };

    yield takeLatest<NewPlayerSocketEvent>(
        NEW_PLAYER_SOCKET_EVENT,
        function*({ payload: { socket: newSocket } }) {
            socket = newSocket;

            registry = new OutgoingPacketRegistry<ServerToClient.Game.PacketDefinitions, ServerToClient.Game.PacketAcknowledgements>(
                (opcode, payload, ack) => socket.emit(opcode, payload, ack)
            );

            yield fork(sendCommands);
            yield fork(sendGamePhaseUpdates);
            yield fork(sendAnnouncements);
            yield fork(sendPlayerListUpdates);
        }
    );

    yield take<PlayerActions.QuitGameAction | GameEvents.GameFinishEvent>([PlayerActions.QUIT_GAME_ACTION, GameEvents.gameFinishEvent.toString()]);
    yield delay(100);

    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
    registry = null;
};
