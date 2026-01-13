import { getDependency } from "@shoki/engine";

import { PlayerEntityDependencies } from "./dependencies";

const getBoards = () =>
	getDependency<PlayerEntityDependencies, "boards">("boards");

export const getBoard = function*(): Generator<
	any,
	PlayerEntityDependencies["boards"]["board"],
	any
> {
	const { board } = yield* getBoards();

	return board;
};

export const getBench = function*(): Generator<
	any,
	PlayerEntityDependencies["boards"]["bench"],
	any
> {
	const { bench } = yield* getBoards();

	return bench;
};
