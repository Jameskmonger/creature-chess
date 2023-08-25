import { io, Socket } from "socket.io-client";

import { GameServerToClient } from "@creature-chess/networking";
import { HandshakeRequest } from "@creature-chess/networking/handshake";

export const getSocket = (request: HandshakeRequest) => {
	const socket = (io as any)(
		{
			path: "/game/socket.io",
		},
		{
			// use websocket first if available
			transports: ["websocket"],
		}
	);

	return new Promise<Socket>((resolve, reject) => {
		socket.on("connect", () => {
			socket.emit("authenticate", request);
		});

		const onAuthenticated = ({
			error,
		}: GameServerToClient.AuthenticateResponse) => {
			if (!error) {
				socket.off("authenticate_response", onAuthenticated);

				resolve(socket);

				return;
			}

			socket.disconnect();

			// todo improve this
			reject(error);
		};

		socket.on("authenticate_response", onAuthenticated);
	});
};
