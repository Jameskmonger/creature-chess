import { getDependency } from "@shoki/engine";
import { PlayerSagaDependencies } from "../../player/sagaContext";

const getBoardSlices = () => getDependency<PlayerSagaDependencies, "boardSlices">("boardSlices");

export const getBoardSlice = function*(): Generator<any, PlayerSagaDependencies["boardSlices"]["boardSlice"], any> {
	const { boardSlice } = yield* getBoardSlices();

	return boardSlice;
};

export const getBenchSlice = function*(): Generator<any, PlayerSagaDependencies["boardSlices"]["benchSlice"], any> {
	const { benchSlice } = yield* getBoardSlices();

	return benchSlice;
};
