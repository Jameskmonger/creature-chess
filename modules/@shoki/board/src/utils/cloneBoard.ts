import { BoardState } from "../types";

export function cloneBoard<T>(state: BoardState<T>): BoardState<T> {
	return {
		...state,
		pieces: Object.fromEntries(
			Object.entries(state.pieces).map(([key, piece]) => [
				key,
				{
					...piece,
				},
			])
		),
	};
}
