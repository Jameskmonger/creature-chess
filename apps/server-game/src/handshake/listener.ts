import { Socket } from "socket.io";
import { logger } from "../log";
import { HandshakeListenerDependencies, HandshakeRequest } from "./types";

/**
 * Attaches to the socket server and raises incoming handshake requests.
 */
export const handshakeListener = (
	deps: HandshakeListenerDependencies,
	onReceive: (socket: Socket, request: HandshakeRequest) => void
) => {
	const { io } = deps;

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
