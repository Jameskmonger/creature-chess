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
	const { database } = deps;

	handshakeListener(deps, async (socket, request) => {
		try {
			if (request.type === "guest") {
				const guest = await database.prisma.guests.findFirst({
					where: {
						token: request.data.accessToken,
						expires_at: {
							gte: new Date(),
						},
					},
				});

				if (!guest) {
					failHandshake(socket, { error: { type: "authentication" } });
					return;
				}

				logger.info(`[socket ${socket.id}] Handshake successful for guest`);

				successHandshake(socket);

				const guestSocket = socket as AuthenticatedSocket;

				guestSocket.data = {
					type: "guest",
					id: guest.id,
					nickname: `Guest ${guest.id}`,
					profile: {
						picture: guest.profile_picture,
						title: null,
					},
				};

				onReceive(guestSocket);

				return;
			}

			failHandshake(socket, { error: { type: "not_registered" } });

			return;
		} catch (e) {
			logger.error(`[socket ${socket.id}] Handshake failed`, { error: e });
			failHandshake(socket, { error: { type: "authentication" } });
		}
	});
};
