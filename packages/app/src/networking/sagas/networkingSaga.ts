import { Socket } from "socket.io-client";
import { all, call } from "redux-saga/effects";
import { PieceModel } from "@creature-chess/models";
import { BoardSlice } from "@creature-chess/board";
import { lobbyNetworking } from "./lobby";
import { gameNetworking } from "./game";

export const networkingSaga = function*(
	socket: Socket,
	slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }
) {
	yield all([
		call(lobbyNetworking, socket),
		call(gameNetworking, socket, slices)
	]);
};
