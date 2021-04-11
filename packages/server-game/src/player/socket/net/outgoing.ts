import { Logger } from "winston";
import { takeLatest, take, fork, all, select, delay } from "@redux-saga/core/effects";
import { Socket } from "socket.io";
import {
    PlayerActions, PlayerState, PlayerInfoCommands, PlayerCommands, GameEvents, PlayerEvents, Match,
    OutgoingPacketRegistry, ServerToClientPacketOpcodes, ServerToClientPacketDefinitions,
    ServerToClientPacketAcknowledgements, PhaseUpdatePacket
} from "@creature-chess/shared";
import { BoardState, BoardSlice } from "@creature-chess/board";
import { NewPlayerSocketEvent, NEW_PLAYER_SOCKET_EVENT } from "../events";
import { Card, GamePhase } from "@creature-chess/models";

type OutgoingRegistry = OutgoingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>;

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
            GameEvents.GAME_PHASE_STARTED_EVENT,
            function*({ payload: { phase, startedAt, round } }) {
                if (phase === GamePhase.PREPARING) {
                    const { board, bench, cardShop: { cards } }: PlayerState = yield select();

                    const packet: PhaseUpdatePacket = {
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

                    registry.emit(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
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

                    let opponentId =
                        match.home.id === playerId
                            ? match.away.id
                            : match.home.id;

                    const packet: PhaseUpdatePacket = {
                        startedAtSeconds: startedAt,
                        phase: GamePhase.READY,
                        payload: {
                            bench,
                            board,
                            opponentId
                        }
                    };

                    registry.emit(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
                } else if (phase === GamePhase.PLAYING) {
                    const packet: PhaseUpdatePacket = { startedAtSeconds: startedAt, phase: GamePhase.PLAYING };

                    registry.emit(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
                }
            }
        );
    };

    const sendAnnouncements = function*() {
        yield all([
            takeLatest<PlayerEvents.PlayerDeathEvent>(
                PlayerEvents.PLAYER_DEATH_EVENT,
                function*() {
                    registry.emit(ServerToClientPacketOpcodes.PLAYER_DEAD, { empty: true });
                }
            ),
            takeLatest<PlayerEvents.PlayerMatchRewardsEvent>(
                PlayerEvents.PLAYER_MATCH_REWARDS_EVENT,
                function*({ payload }: PlayerEvents.PlayerMatchRewardsEvent) {
                    registry.emit(ServerToClientPacketOpcodes.MATCH_REWARDS, payload);
                }
            ),
            takeLatest<GameEvents.GameFinishEvent>(
                GameEvents.GAME_FINISH_EVENT,
                function*({ payload: { winnerName } }) {
                    registry.emit(ServerToClientPacketOpcodes.FINISH_GAME, { winnerName });
                }
            )
        ]);
    };

    const sendPlayerListUpdates = function*() {
        yield takeLatest<GameEvents.PlayerListChangedEvent>(
            GameEvents.PLAYER_LIST_CHANGED_EVENT,
            function*({ payload: { players } }) {
                registry.emit(ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, players);
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

                    registry.emit(ServerToClientPacketOpcodes.BENCH_UPDATE, { state: bench });
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

                    registry.emit(ServerToClientPacketOpcodes.BOARD_UPDATE, { state: board });
                }
            ),

            yield takeLatest(
                PlayerCommands.updateCardsCommand,
                function*() {
                    const cards: Card[] = yield select((state: PlayerState) => state.cardShop.cards);

                    registry.emit(ServerToClientPacketOpcodes.CARDS_UPDATE, cards);
                }
            ),
            yield takeLatest(
                PlayerCommands.updateShopLockCommand,
                function*() {
                    const locked: boolean = yield select((state: PlayerState) => state.cardShop.locked);

                    registry.emit(ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE, { locked });
                }
            ),
            yield takeLatest<PlayerInfoCommands.UpdateMoneyCommand>(
                PlayerInfoCommands.UPDATE_MONEY_COMMAND,
                function*() {
                    const money: number = yield select((state: PlayerState) => state.playerInfo.money);

                    registry.emit(ServerToClientPacketOpcodes.MONEY_UPDATE, money);
                }
            ),
            yield takeLatest<PlayerInfoCommands.UpdateLevelCommand>(
                PlayerInfoCommands.UPDATE_LEVEL_COMMAND,
                function*() {
                    const level: number = yield select((state: PlayerState) => state.playerInfo.level);
                    const xp: number = yield select((state: PlayerState) => state.playerInfo.xp);

                    registry.emit(ServerToClientPacketOpcodes.LEVEL_UPDATE, { level, xp });
                }
            )
        ]);
    };

    yield takeLatest<NewPlayerSocketEvent>(
        NEW_PLAYER_SOCKET_EVENT,
        function*({ payload: { socket: newSocket } }) {
            socket = newSocket;

            registry = new OutgoingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>(
                (opcode, payload, ack) => socket.emit(opcode, payload, ack)
            );

            yield fork(sendCommands);
            yield fork(sendGamePhaseUpdates);
            yield fork(sendAnnouncements);
            yield fork(sendPlayerListUpdates);
        }
    );

    yield take([PlayerActions.QUIT_GAME_ACTION, GameEvents.GAME_FINISH_EVENT]);
    yield delay(100);

    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
    registry = null;
};
