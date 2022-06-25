import { Socket } from "socket.io";

import { GameServerToClient } from "@creature-chess/networking";

export const failHandshake = (
	socket: Socket,
	response: GameServerToClient.AuthenticateResponse
) => {
	socket.emit("authenticate_response", response);
	socket.removeAllListeners();
	socket.disconnect();
};

export const successHandshake = (socket: Socket) => {
	socket.removeAllListeners("authenticate");
	socket.emit("authenticate_response", { error: null });
};
