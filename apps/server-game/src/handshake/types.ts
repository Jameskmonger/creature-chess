import { Server } from "socket.io";

export type HandshakeListenerDependencies = {
	io: Server;
};
