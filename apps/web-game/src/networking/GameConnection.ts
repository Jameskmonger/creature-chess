import { Socket } from "socket.io-client";
import { setPing } from "~/store/game/network";
import { PlayerListCommands } from "~/store/game/playerList/state";
import { SettingsCommands } from "~/store/game/settings/state";
import { setInGameCommand, setWinnerIdCommand } from "~/store/game/ui/actions";

import {
	BattleCommands,
	PieceCombatState,
	PieceInfoStore,
} from "@creature-chess/battle";
import { Board } from "@creature-chess/board";
import {
	GameEvents,
	PlayerEvents,
	PlayerCommands,
	PlayerActionTypesArray,
} from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";
import { GameServerToClient } from "@creature-chess/networking";
import { PieceRegistry } from "@creature-chess/utils";

import { EventBus } from "./EventBus";
import { ConnectionStatus, GameEventMap, Dispatch } from "./types";
import { updateBoardFromPacket } from "./utils/updateBoardFromPacket";

export type BoardSlices = {
	board: Board;
	bench: Board;
	matchBoard: Board;
	pieceRegistry: PieceRegistry;
	combatStore: PieceInfoStore<PieceCombatState>;
};

export class GameConnection {
	private cleanupFns: (() => void)[] = [];
	private pingInterval: ReturnType<typeof setInterval> | null = null;

	public constructor(
		private socket: Socket,
		private dispatch: Dispatch,
		private gameBoard: BoardSlices,
		private eventBus: EventBus<GameEventMap>
	) {
		this.setupListeners();
		this.startPingLoop();
	}

	public handleConnected(payload: GameServerToClient.GameConnectionPacket) {
		const {
			players,
			game: { phase, phaseStartedAtSeconds, round },
			settings,
		} = payload;

		this.dispatch(PlayerListCommands.updatePlayerListCommand(players));
		this.dispatch(
			GameEvents.gamePhaseStartedEvent({
				phase,
				startedAt: phaseStartedAtSeconds,
				round,
			})
		);
		this.dispatch(SettingsCommands.setSettingsCommand(settings));
		this.dispatch(setInGameCommand());

		this.eventBus.emit("connectionStatusChanged", ConnectionStatus.CONNECTED);
	}

	public sendPlayerAction(action: { type: string; payload?: any }) {
		if (!PlayerActionTypesArray.includes(action.type)) {
			console.error(`Invalid player action type: ${action.type}`);
			return;
		}

		const sent = Date.now();
		this.socket.emit("sendPlayerActions", action, () => {
			const rtt = Date.now() - sent;
			this.dispatch(setPing(rtt));
		});
	}

	public sendFinishMatch() {
		this.socket.emit("finishMatch", { empty: true });
	}

	public destroy() {
		this.stopPingLoop();

		for (const cleanup of this.cleanupFns) {
			cleanup();
		}
		this.cleanupFns = [];
	}

	private setupListeners() {
		this.setupBoardListeners();
		this.setupActionListener(
			"sendGameEvents",
			GameEvents.GameEventActionTypesArray,
			(action) => {
				this.routeGameEvent(action);
			}
		);
		this.setupActionListener(
			"sendLocalPlayerEvents",
			PlayerEvents.PlayerEventActionTypesArray,
			(action) => {
				this.routePlayerEvent(action);
			}
		);
		this.setupActionListener(
			"playerInfoUpdates",
			PlayerCommands.PlayerInfoUpdateCommandActionTypesArray
		);
		this.setupSocketListener(
			"snapshot",
			(actions: { type: string; payload?: any }[]) => {
				for (const action of actions) {
					if (
						!PlayerCommands.PlayerInfoUpdateCommandActionTypesArray.includes(
							action.type
						)
					) {
						console.error(`Unhandled snapshot action type: ${action.type}`);
						continue;
					}
					this.dispatch(action);
				}
			}
		);
		// reconnect_failed/reconnect_error are Manager-level events in socket.io v4
		const onDisconnected = () => {
			this.eventBus.emit(
				"connectionStatusChanged",
				ConnectionStatus.DISCONNECTED
			);
		};
		this.socket.io.on("reconnect_failed", onDisconnected);
		this.socket.io.on("reconnect_error", onDisconnected);
		this.cleanupFns.push(
			() => this.socket.io.off("reconnect_failed", onDisconnected),
			() => this.socket.io.off("reconnect_error", onDisconnected)
		);
	}

	private setupBoardListeners() {
		const { board, bench, matchBoard, pieceRegistry } = this.gameBoard;

		this.setupSocketListener(
			"boardUpdate",
			(packet: GameServerToClient.BoardUpdatePacket) => {
				updateBoardFromPacket(board, pieceRegistry, packet);
			}
		);
		this.setupSocketListener(
			"benchUpdate",
			(packet: GameServerToClient.BoardUpdatePacket) => {
				updateBoardFromPacket(bench, pieceRegistry, packet);
			}
		);
		this.setupSocketListener(
			"matchBoardUpdate",
			(packet: {
				turn: number | null;
				board: GameServerToClient.BoardUpdatePacket;
			}) => {
				updateBoardFromPacket(matchBoard, pieceRegistry, packet.board);
				if (packet.turn !== null) {
					this.dispatch(
						BattleCommands.startBattleCommand({ turn: packet.turn })
					);
				}
			}
		);
	}

	private setupSocketListener(
		event: string,
		handler: (...args: any[]) => void
	) {
		this.socket.on(event, handler);
		this.cleanupFns.push(() => this.socket.off(event, handler));
	}

	private setupActionListener(
		event: string,
		validTypes: string[],
		onAction?: (action: { type: string; payload?: any }) => void
	) {
		this.setupSocketListener(
			event,
			(action: { type: string; payload?: any }, ack?: () => void) => {
				if (ack) {
					ack();
				}
				if (!validTypes.includes(action.type)) {
					console.error(`Unhandled ${event} type: ${action.type}`);
					return;
				}
				this.dispatch(action);
				onAction?.(action);
			}
		);
	}

	private routeGameEvent(action: { type: string; payload?: any }) {
		if (action.type === GameEvents.gamePhaseStartedEvent.toString()) {
			const { phase } = action.payload;
			if (phase === GamePhase.PREPARING) {
				this.dispatch(
					PlayerCommands.playerInfoCommands.updateOpponentCommand({ id: null })
				);
			}
			this.eventBus.emit("phaseChanged", action.payload);
		}

		if (action.type === GameEvents.gameFinishEvent.toString()) {
			const winner = action.payload.players.find(
				(p: { position: number }) => p.position === 1
			);
			if (winner) {
				this.dispatch(setWinnerIdCommand({ winnerId: winner.id }));
			}
			this.eventBus.emit("gameFinished", action.payload);
		}

		if (action.type === GameEvents.playerListChangedEvent.toString()) {
			this.dispatch(
				PlayerListCommands.updatePlayerListCommand(action.payload.players)
			);
			this.eventBus.emit("playerListChanged", action.payload);
		}
	}

	private routePlayerEvent(action: { type: string; payload?: any }) {
		if (action.type === PlayerEvents.playerReceiveQuickChatEvent.toString()) {
			this.eventBus.emit("quickChat", action.payload);
		}
		if (action.type === PlayerEvents.playerDeathEvent.toString()) {
			this.eventBus.emit("playerDeath", undefined);
		}
	}

	private startPingLoop() {
		this.pingInterval = setInterval(() => {
			const sent = Date.now();
			this.socket.emit("ping", { type: "ping" }, () => {
				const rtt = Date.now() - sent;
				this.dispatch(setPing(rtt));
			});
		}, 2500);
	}

	private stopPingLoop() {
		if (this.pingInterval) {
			clearInterval(this.pingInterval);
			this.pingInterval = null;
		}
	}
}
