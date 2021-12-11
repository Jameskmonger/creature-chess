import { GameServerToClient } from "@creature-chess/networking";
import { Socket } from "socket.io";

export const failHandshake = (socket: Socket, response: GameServerToClient.AuthenticateResponse) => {
	socket.emit("handshake_response", response);
	socket.removeAllListeners();
	socket.disconnect();
};

export const successHandshake = (socket: Socket) => {
	socket.removeAllListeners("handshake");
	socket.emit("handshake_response", { error: null });
};
