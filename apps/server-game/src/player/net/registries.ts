import { getContext, setContext } from "typed-redux-saga";

import { GameSocket } from "../socket";

export const getPlayerSocket = () => getContext<GameSocket>("playerSocket");
export const setPlayerSocket = (socket: GameSocket | null) =>
	setContext<{ playerSocket: GameSocket | null }>({
		playerSocket: socket,
	});
