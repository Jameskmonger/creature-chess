import { fork } from "@redux-saga/core/effects";
import { PieceModel } from "@creature-chess/models";
import { BoardSlice } from "@creature-chess/board";
import { lobbyNetworking } from "./lobby";
import { gameNetworking } from "./game";

export const networkingSaga = function*(
	socket: SocketIOClient.Socket,
	slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }
) {
	yield fork(lobbyNetworking, socket);
	yield fork(gameNetworking, socket, slices);
};
