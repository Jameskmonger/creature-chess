import { GameEvents } from "@creature-chess/models";
import { Socket } from "socket.io-client";
import { InboundChannel, wireProtocol } from "~/plugins/wireProtocol";
import {
	boardUpdateAction,
	benchUpdateAction,
	matchBoardUpdateAction,
} from "~/store/board/sync";
import { setPing } from "~/store/game/network";
import {
	setConnectionStatusCommand,
	setInGameCommand,
} from "~/store/game/ui/actions";
import { setSettingsAction } from "~/store/settings/sync";

import { GameServerToClient } from "@creature-chess/networking";

import { setCreatureDefinitions } from "./creatureDefinitions";
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
			creatures,
		} = payload;

		setCreatureDefinitions(creatures);

		// setSettingsAction must be first, as the listener creates the GameSession.
		this.dispatch(setSettingsAction(settings));
		this.dispatch(GameEvents.playerListChangedEvent({ players }));
		this.dispatch(
			GameEvents.gamePhaseStartedEvent({
				phase,
				startedAt: phaseStartedAtSeconds,
				round,
			})
		);
		this.dispatch(setInGameCommand());
		this.dispatch(setConnectionStatusCommand(ConnectionStatus.CONNECTED));
	}

	public sendPlayerAction(action: { type: string; payload?: any }) {
		if (!wireProtocol.acceptsOutbound(action.type)) {
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
		this.setupActionListener("sendGameEvents", "gameEvents");
		this.setupActionListener("sendLocalPlayerEvents", "playerEvents");
		this.setupActionListener("playerInfoUpdates", "playerInfoUpdates");
		this.setupSocketListener(
			"snapshot",
			(actions: { type: string; payload?: any }[]) => {
				for (const action of actions) {
					if (!wireProtocol.acceptsInbound("playerInfoUpdates", action.type)) {
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

	private setupActionListener(socketEvent: string, channel: InboundChannel) {
		this.setupSocketListener(
			socketEvent,
			(action: { type: string; payload?: any }, ack?: () => void) => {
				if (ack) {
					ack();
				}
				const validation = wireProtocol.validateInbound(
					channel,
					action.type,
					action.payload
				);

				if (!validation.ok) {
					console.error(
						`Rejected ${socketEvent} of type "${action.type}": ${validation.reason}`
					);
					return;
				}

				this.dispatch({ ...action, payload: validation.payload });
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
