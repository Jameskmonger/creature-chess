import { Player } from "@creature-chess/gamemode";
import { RoundInfoState } from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";

import { setupPlayerBoard } from "./board";
import { setupIncomingNetworking } from "./net/incoming";
import { setupOutgoingNetworking } from "./net/outgoing";
import { buildSnapshot } from "./net/outgoing/snapshot";
import { GameSocket } from "./socket";

type Parameters = {
	getRoundInfo: () => RoundInfoState;
	getPlayers: () => PlayerListPlayer[];
};

const cancellableDelay = (
	ms: number,
	signal: AbortSignal
): Promise<{ cancelled: boolean }> =>
	new Promise((resolve) => {
		if (signal.aborted) {
			resolve({ cancelled: true });
			return;
		}
		const timer = setTimeout(() => {
			signal.removeEventListener("abort", onAbort);
			resolve({ cancelled: false });
		}, ms);
		const onAbort = () => {
			clearTimeout(timer);
			resolve({ cancelled: true });
		};
		signal.addEventListener("abort", onAbort, { once: true });
	});

export const playerNetworking = (
	entity: Player,
	socket: GameSocket,
	{ getRoundInfo, getPlayers }: Parameters,
	settings: GamemodeSettings
) => {
	entity.setSpectatingId(null);

	const cleanups: (() => void)[] = [];
	const teardownAbort = new AbortController();

	const teardown = () => {
		teardownAbort.abort();
		cleanups.forEach((fn) => fn());
		socket.removeAllListeners();
		socket.disconnect();
	};

	cleanups.push(setupIncomingNetworking(socket, entity));

	(async () => {
		const initial = await cancellableDelay(500, teardownAbort.signal);
		if (initial.cancelled) {
			return;
		}

		socket.emit("gameConnected", {
			game: getRoundInfo(),
			players: getPlayers(),
			settings,
		});

		// Client constructs GameConnection synchronously on gameConnected — its
		// listeners are live by the time subsequent emits land.
		socket.emit("snapshot", buildSnapshot(entity));

		cleanups.push(setupOutgoingNetworking(entity, socket));
		cleanups.push(setupPlayerBoard(entity, socket));
	})();

	cleanups.push(
		entity.events.onQuit(async () => {
			const r = await cancellableDelay(100, teardownAbort.signal);
			if (!r.cancelled) {
				teardown();
			}
		})
	);

	cleanups.push(
		entity.gamemode.events.onAnyEvent("finish", async () => {
			// allow the game finish event to be sent before closing the networking
			const r = await cancellableDelay(1000, teardownAbort.signal);
			if (!r.cancelled) {
				teardown();
			}
		})
	);

	return { teardown };
};
