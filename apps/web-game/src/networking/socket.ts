import { io, Socket } from "socket.io-client";
import { GameServerToClient } from "@creature-chess/networking";

export const getSocket = (idToken: string) => {
	const socket = io(
		{
			path: "/game/socket.io",
		},
		{
			// use websocket first if available
			transports: ["websocket", "polling"],
		}
	);

	return new Promise<Socket>((resolve, reject) => {
		socket.on("connect", () => {
			socket.emit("authenticate", { idToken });
		});

		const onAuthenticated = ({ error }: GameServerToClient.AuthenticateResponse) => {
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
