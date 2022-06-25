import { getDependency } from "@shoki/engine";

import { PlayerEntityDependencies } from "./dependencies";

const getBoardSlices = () =>
	getDependency<PlayerEntityDependencies, "boardSlices">("boardSlices");

export const getBoardSlice = function* (): Generator<
	any,
	PlayerEntityDependencies["boardSlices"]["boardSlice"],
	any
> {
	const { boardSlice } = yield* getBoardSlices();

	return boardSlice;
};

export const getBenchSlice = function* (): Generator<
	any,
	PlayerEntityDependencies["boardSlices"]["benchSlice"],
	any
> {
	const { benchSlice } = yield* getBoardSlices();

	return benchSlice;
};
