import { Socket } from "socket.io";

import { HandshakeRequest } from "@creature-chess/networking/handshake";

import { socketInBytes, socketOutBytes } from "../Metrics";
import { logger } from "../log";
import { HandshakeListenerDependencies } from "./types";

function dataToBytes(data: any) {
	try {
		return Buffer.byteLength(
			typeof data === "string" ? data : JSON.stringify(data) || "",
			"utf8"
		);
	} catch (e) {
		return 0;
	}
}

function trackBandwidth(socket: Socket) {
	const org_emit = socket.emit;
	socket.emit = (event: string, ...data: any[]) => {
		socketOutBytes.labels({ event }).inc(dataToBytes(data));

		return org_emit.apply(socket, [event, ...data]);
	};

	const org_onevent = (socket as any).onevent;
	(socket as any).onevent = (packet: any) => {
		if (packet && packet.data) {
			const [event, data] = packet.data;

			if (event !== "error") {
				socketInBytes.labels({ event }).inc(dataToBytes(data));
			}
		}

		return org_onevent.call(socket, packet);
	};
}

/**
 * Attaches to the socket server and raises incoming handshake requests.
 */
export const handshakeListener = (
	deps: HandshakeListenerDependencies,
	onReceive: (socket: Socket, request: HandshakeRequest) => void
) => {
	const { io } = deps;

	io.on("connection", (socket) => {
		trackBandwidth(socket);

		logger.info(`[socket ${socket.id}] New connection received`);

		socket.on("authenticate", (request: HandshakeRequest) => {
			logger.info(`[socket ${socket.id}] Handshake request received`);

			onReceive(socket, request);
		});
	});
};
