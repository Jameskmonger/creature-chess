import { Socket } from "socket.io";

import { HandshakeRequest } from "@creature-chess/networking/handshake";

import { logger } from "../log";
import { HandshakeListenerDependencies } from "./types";

/**
 * Attaches to the socket server and raises incoming handshake requests.
 */
export const handshakeListener = (
	deps: HandshakeListenerDependencies,
	onReceive: (socket: Socket, request: HandshakeRequest) => void
) => {
	const { io } = deps;

	io.on("connection", (socket) => {
		logger.info(`[socket ${socket.id}] New connection received`);

		socket.on("authenticate", (request: HandshakeRequest) => {
			logger.info(`[socket ${socket.id}] Handshake request received`);

			onReceive(socket, request);
		});
	});
};
