type Listener = () => void;

export type PieceInfoStore<TState> = {
	seedPiece: (pieceId: string, state: TState) => void;
	clear: () => void;
	getPiece: (pieceId: string) => TState;
	updatePiece: (pieceId: string, state: TState) => void;
	updatePiecePartial: (pieceId: string, state: Partial<TState>) => void;
	subscribe: (listener: Listener) => () => void;
	getSnapshot: () => number;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	_getMap: () => Map<string, TState>;
};

export function pieceInfoStore<TState>(): PieceInfoStore<TState> {
	const map = new Map<string, TState>();
	const listeners = new Set<Listener>();
	let version = 0;

	let rafScheduled = false;
	let pendingNotify = false;

	const notifyListeners = () => {
		for (const l of listeners) {
			l();
		}
	};

	const markChanged = () => {
		version++;

		const shouldCoalesce =
			typeof window !== "undefined" &&
			typeof requestAnimationFrame !== "undefined";

		if (!shouldCoalesce) {
			notifyListeners();
			return;
		}

		pendingNotify = true;
		if (rafScheduled) {
			return;
		}

		rafScheduled = true;
		requestAnimationFrame(() => {
			rafScheduled = false;
			if (!pendingNotify) {
				return;
			}
			pendingNotify = false;

			notifyListeners();
		});
	};

	const requireSeeded = (pieceId: string): TState => {
		const state = map.get(pieceId);
		if (!state) {
			throw new Error(
				`pieceInfoStore: piece "${pieceId}" is not seeded. Call seedPiece first.`
			);
		}
		return state;
	};

	return {
		seedPiece: (pieceId, state) => {
			map.set(pieceId, state);
			markChanged();
		},
		clear: () => {
			if (map.size === 0) {
				return;
			}
			map.clear();
			markChanged();
		},
		getPiece: (pieceId) => requireSeeded(pieceId),
		updatePiece: (pieceId, state) => {
			requireSeeded(pieceId);
			map.set(pieceId, state);
			markChanged();
		},
		updatePiecePartial: (pieceId, state) => {
			const currentState = requireSeeded(pieceId);
			map.set(pieceId, { ...currentState, ...state });
			markChanged();
		},
		subscribe: (listener) => {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		},
		getSnapshot: () => version,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		_getMap: () => map,
	};
}
