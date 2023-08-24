import { io, Socket } from "socket.io-client";

import { GameServerToClient, GameServerHandshake } from "@creature-chess/networking";

export const getSocket = (payload: GameServerHandshake.InitConnectionRequest) => {
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
			socket.emit("authenticate", payload);
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
