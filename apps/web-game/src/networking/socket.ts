import { io, Socket } from "socket.io-client";
import { GameServerToClient } from "@creature-chess/networking";

export const getSocket = (idToken: string) => {
	const socket = io();

	return new Promise<Socket>((resolve, reject) => {
		socket.on("connect", () => {
			socket.emit("handshake", { idToken });
		});

		const onAuthenticated = ({ error }: GameServerToClient.AuthenticateResponse) => {
			if (!error) {
				socket.off("handshake_response", onAuthenticated);

				resolve(socket);

				return;
			}

			socket.disconnect();

			// todo improve this
			reject(error);
		};

		socket.on("handshake_response", onAuthenticated);
	});
};
