import { IdentityProviderRegistry } from "@creature-chess/gamemode";

import { logger } from "../log";
import { AuthenticatedSocket } from "../player/socket";
import { handshakeListener } from "./listener";
import { failHandshake, successHandshake } from "./response";
import { HandshakeListenerDependencies } from "./types";

/**
 * Listen for incoming connections, process the handshake by dispatching to the
 * identity provider registered for the request's `type`, and raise any
 * connections that pass.
 *
 * @param identity The registry of identity providers.
 * @param onReceive The callback for sockets that pass handshake.
 */
export const onHandshakeSuccess = (
	deps: HandshakeListenerDependencies,
	identity: IdentityProviderRegistry,
	onReceive: (socket: AuthenticatedSocket) => void
) => {
	handshakeListener(deps, async (socket, request) => {
		try {
			const result = await identity.resolve(request.type, request.data);

			if (!result.ok) {
				failHandshake(socket, { error: { type: "authentication" } });
				return;
			}

			logger.info(
				`[socket ${socket.id}] Handshake successful for ${result.identity.type}`
			);

			successHandshake(socket, result.identity.id);

			const authedSocket = socket as AuthenticatedSocket;
			authedSocket.data = result.identity;

			onReceive(authedSocket);
		} catch (e) {
			logger.error(`[socket ${socket.id}] Handshake failed`, { error: e });
			failHandshake(socket, { error: { type: "authentication" } });
		}
	});
};
