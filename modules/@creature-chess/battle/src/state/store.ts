export type PieceInfoStore<TState> = {
	getPiece: (pieceId: string) => TState;
	updatePiece: (pieceId: string, state: TState) => void;
	updatePiecePartial: (pieceId: string, state: Partial<TState>) => void;
	_getMap: () => Map<string, TState>;
};

export function pieceInfoStore<TState>(
	initialState: TState
): PieceInfoStore<TState> {
	const map = new Map<string, TState>();

	return {
		getPiece: (pieceId: string) => {
			const state = map.get(pieceId);

			if (!state) {
				map.set(pieceId, initialState);
				return initialState;
			}

			return state;
		},
		updatePiece: (pieceId: string, state: TState) => {
			map.set(pieceId, state);
		},
		updatePiecePartial: (pieceId: string, state: Partial<TState>) => {
			const currentState = map.get(pieceId);

			if (currentState) {
				map.set(pieceId, { ...currentState, ...state });
			}
		},
		_getMap: () => map,
	};
}
