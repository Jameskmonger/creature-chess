import { Socket } from "socket.io";
import { HandshakeListenerDependencies, HandshakeRequest } from "./types";

/**
 * Attaches to the socket server and raises incoming handshake requests.
 */
export const handshakeListener = (
	deps: HandshakeListenerDependencies,
	onReceive: (socket: Socket, request: HandshakeRequest) => void
) => {
	const { io, logger } = deps;

	io.on(
		"connection",
		socket => {
			logger.info(`[socket ${socket.id}] New connection received`);

			socket.on("handshake", (request: HandshakeRequest) => {
				logger.info(`[socket ${socket.id}] Handshake request recieved`);

				onReceive(socket, request);
			});
		}
	);
};
