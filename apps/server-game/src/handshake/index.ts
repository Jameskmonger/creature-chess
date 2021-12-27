import { authenticate } from "@creature-chess/auth-server";
import { logger } from "../log";
import { AuthenticatedSocket } from "../player/socket";
import { handshakeListener } from "./listener";
import { failHandshake, successHandshake } from "./response";
import { HandshakeListenerDependencies } from "./types";

/**
 * Listen for incoming connections, process the handshake, and raise any connections that pass.
 *
 * @param onReceive The callback for sockets that pass handshake.
 */
export const onHandshakeSuccess = (
	deps: HandshakeListenerDependencies,
	onReceive: (socket: AuthenticatedSocket) => void
) => {
	const { authClient, database } = deps;

	logger.info("Listening for successful handshakes - inner A");

	handshakeListener(
		deps,
		async (socket, { idToken }) => {
			try {
				logger.info("Authenticating new handshake", { meta: { socketId: socket.id } });

				const user = await authenticate(authClient, database, idToken);

				if (!user.registered) {
					failHandshake(socket, { error: { type: "not_registered" } });

					return;
				}

				logger.info(`[socket ${socket.id}] Handshake successful for '${user.nickname}'`);

				successHandshake(socket);

				const authenticatedSocket = socket as AuthenticatedSocket;

				authenticatedSocket.data = {
					id: user.id,
					nickname: user.nickname,
					profile: user.profile
				};

				onReceive(authenticatedSocket);
			} catch (e) {
				logger.error(`[socket ${socket.id}] Handshake failed`, { error: e });
				failHandshake(socket, { error: { type: "authentication" } });
			}
		}
	);
};
