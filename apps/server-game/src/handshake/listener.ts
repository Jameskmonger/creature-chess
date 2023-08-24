import { GameServerHandshake } from "@creature-chess/networking";
import { Socket } from "socket.io";

import { logger } from "../log";
import { HandshakeListenerDependencies } from "./types";

/**
 * Attaches to the socket server and raises incoming handshake requests.
 */
export const handshakeListener = (
	deps: HandshakeListenerDependencies,
	onReceive: (socket: Socket, request: GameServerHandshake.InitConnectionRequest) => void
) => {
	const { io } = deps;

	logger.info("Listening for successful handshakes - inner B");

	io.on("connection", (socket) => {
		logger.info(`[socket ${socket.id}] New connection received`);

		socket.on("authenticate", (request: GameServerHandshake.InitConnectionRequest) => {
			logger.info(`[socket ${socket.id}] Handshake request received`);

			onReceive(socket, request);
		});
	});
};
