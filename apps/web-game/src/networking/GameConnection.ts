import { Socket } from "socket.io-client";
import { setPing } from "~/store/game/network";
import { SettingsCommands } from "~/store/game/settings/state";
import {
	setConnectionStatusCommand,
	setInGameCommand,
} from "~/store/game/ui/actions";

import {
	boardUpdateAction,
	benchUpdateAction,
	matchBoardUpdateAction,
} from "~/store/board/sync";

import {
	GameEvents,
	PlayerEvents,
	PlayerCommands,
	PlayerActionTypesArray,
} from "@creature-chess/gamemode";
import { GameServerToClient } from "@creature-chess/networking";

import { ConnectionStatus, Dispatch } from "./types";

export class GameConnection {
	private cleanupFns: (() => void)[] = [];
	private pingInterval: ReturnType<typeof setInterval> | null = null;

	public constructor(
		private socket: Socket,
		private dispatch: Dispatch
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

		this.dispatch(GameEvents.playerListChangedEvent({ players }));
		this.dispatch(
			GameEvents.gamePhaseStartedEvent({
				phase,
				startedAt: phaseStartedAtSeconds,
				round,
			})
		);
		this.dispatch(SettingsCommands.setSettingsCommand(settings));
		this.dispatch(setInGameCommand());
		this.dispatch(setConnectionStatusCommand(ConnectionStatus.CONNECTED));
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
		this.setupSocketListener(
			"boardUpdate",
			(packet: GameServerToClient.BoardUpdatePacket) => {
				this.dispatch(boardUpdateAction(packet));
			}
		);
		this.setupSocketListener(
			"benchUpdate",
			(packet: GameServerToClient.BoardUpdatePacket) => {
				this.dispatch(benchUpdateAction(packet));
			}
		);
		this.setupSocketListener(
			"matchBoardUpdate",
			(packet: GameServerToClient.MatchBoardUpdatePacket) => {
				this.dispatch(matchBoardUpdateAction(packet));
			}
		);
		this.setupActionListener(
			"sendGameEvents",
			GameEvents.GameEventActionTypesArray
		);
		this.setupActionListener(
			"sendLocalPlayerEvents",
			PlayerEvents.PlayerEventActionTypesArray
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
			this.dispatch(setConnectionStatusCommand(ConnectionStatus.DISCONNECTED));
		};
		this.socket.io.on("reconnect_failed", onDisconnected);
		this.socket.io.on("reconnect_error", onDisconnected);
		this.cleanupFns.push(
			() => this.socket.io.off("reconnect_failed", onDisconnected),
			() => this.socket.io.off("reconnect_error", onDisconnected)
		);
	}

	private setupSocketListener(
		event: string,
		handler: (...args: any[]) => void
	) {
		this.socket.on(event, handler);
		this.cleanupFns.push(() => this.socket.off(event, handler));
	}

	private setupActionListener(event: string, validTypes: string[]) {
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
			}
		);
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
