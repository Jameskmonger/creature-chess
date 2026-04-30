import { Logger } from "winston";

import { Board } from "@creature-chess/board";
import { GamemodeSettings } from "@creature-chess/models";
import { PlayerProfile } from "@creature-chess/models";

import type { Gamemode } from "../../game";
import type { Match } from "../../game/match";
import { roundInfoReducer } from "../../game/roundInfo";
import { setupPlayerListeners } from "./listeners/root";
import { PlayerState, playerReducers } from "./state";

// ── Action types ──

type Action = { type: string; payload?: any };

type ActionCreatorWithType = ((...args: any[]) => Action) & {
	type: string;
	toString(): string;
	match(action: any): boolean;
};

// ── Listener types ──

export type PlayerListenerApi = {
	getState: () => PlayerState;
	dispatch: (action: Action) => void;
	take: (predicate: (action: Action) => boolean) => Promise<Action>;
	delay: (ms: number) => Promise<void>;
	cancelActiveListeners: () => void;
	player: Player;
};

type ListenerOptions = {
	actionCreator?: ActionCreatorWithType;
	type?: string;
	predicate?: (
		action: Action,
		currentState: PlayerState,
		previousState: PlayerState
	) => boolean;
	matcher?: (action: any) => boolean;
	effect: (action: any, api: PlayerListenerApi) => Promise<void>;
};

export type PlayerStartListening = (options: ListenerOptions) => () => void;

export type CancellableTask = {
	promise: Promise<void>;
	cancel(): void;
};

// ── Player type ──

export type Player = {
	readonly id: string;

	// Was "dependencies"
	readonly logger: Logger;
	readonly board: Board;
	readonly bench: Board;
	readonly gamemode: Gamemode;
	readonly settings: GamemodeSettings;

	// Was "variables"
	name: string;
	profile: PlayerProfile;
	finishPosition: number;
	finishRound: number;
	match: Match | null;

	// State management
	select: <T>(selector: (state: PlayerState) => T) => T;
	put: (action: Action) => void;
	addListener: PlayerStartListening;
	runEffect: (
		effect: (api: PlayerListenerApi) => Promise<void>
	) => CancellableTask;
};

// ── Internals ──

type ReducersMapObject<TState> = {
	[K in keyof TState]: (
		state: TState[K] | undefined,
		action: Action
	) => TState[K];
};

type Listener = {
	matches: (
		action: Action,
		currentState: PlayerState,
		previousState: PlayerState
	) => boolean;
	effect: (action: any, api: PlayerListenerApi) => Promise<void>;
};

type TakeWaiter = {
	predicate: (action: Action) => boolean;
	resolve: (action: Action) => void;
	reject: (err: Error) => void;
};

class CancelledError extends Error {
	public constructor() {
		super("cancelled");
	}
}

/**
 * A lightweight replacement for AbortController.
 *
 * AbortController allocates a DOMException when cancelled, which
 * can be expensive if cancellations are frequent.
 */
type CancelToken = {
	readonly aborted: boolean;
	onAbort: (fn: () => void) => () => void;
	cancel: () => void;
};

const createCancelToken = (): CancelToken => {
	let aborted = false;
	const handlers = new Set<() => void>();
	return {
		get aborted() {
			return aborted;
		},
		onAbort: (fn) => {
			if (aborted) {
				fn();
				return () => undefined;
			}
			handlers.add(fn);
			return () => handlers.delete(fn);
		},
		cancel: () => {
			if (aborted) {
				return;
			}
			aborted = true;
			for (const fn of handlers) {
				fn();
			}
			handlers.clear();
		},
	};
};

function combineReducersPlain<TState>(reducers: ReducersMapObject<TState>) {
	const keys = Object.keys(reducers) as (keyof TState)[];

	return (state: TState | undefined, action: Action): TState => {
		let changed = false;
		const nextState = {} as TState;

		for (const key of keys) {
			const reducer = reducers[key] as (state: any, action: Action) => any;
			const prev = state ? state[key] : undefined;
			const next = reducer(prev, action);
			nextState[key] = next;
			if (next !== prev) {
				changed = true;
			}
		}

		return changed || !state ? nextState : state;
	};
}

// ── Factory ──

export const createPlayer = (
	id: string,
	dependencies: {
		logger: Logger;
		boards: { board: Board; bench: Board };
		gamemode: Gamemode;
		settings: GamemodeSettings;
	},
	initialVars: {
		name: string;
		profile: PlayerProfile;
		finishPosition: number;
		finishRound: number;
		match: Match | null;
	}
): Player => {
	// Initialize state
	const rootReducer = combineReducersPlain<PlayerState>({
		...playerReducers,
		roundInfo: roundInfoReducer,
	});
	let state: PlayerState = rootReducer(undefined, { type: "@@INIT" });

	// Listener registry
	const listeners: Listener[] = [];
	const takeWaiters: TakeWaiter[] = [];

	const removeTakeWaiter = (waiter: TakeWaiter) => {
		const i = takeWaiters.indexOf(waiter);
		if (i !== -1) {
			takeWaiters.splice(i, 1);
		}
	};

	const createApi = (token: CancelToken): PlayerListenerApi => ({
		getState: () => state,
		dispatch: (action: Action) => put(action),
		take: (predicate: (action: Action) => boolean) =>
			new Promise<Action>((resolve, reject) => {
				if (token.aborted) {
					reject(new CancelledError());
					return;
				}

				let unsubscribe: () => void = () => undefined;
				const waiter: TakeWaiter = {
					predicate,
					resolve: (action) => {
						unsubscribe();
						resolve(action);
					},
					reject,
				};
				takeWaiters.push(waiter);

				unsubscribe = token.onAbort(() => {
					removeTakeWaiter(waiter);
					reject(new CancelledError());
				});
			}),
		delay: (ms: number) =>
			new Promise<void>((resolve, reject) => {
				if (token.aborted) {
					reject(new CancelledError());
					return;
				}

				let unsubscribe: () => void = () => undefined;
				const timer = setTimeout(() => {
					unsubscribe();
					resolve();
				}, ms);

				unsubscribe = token.onAbort(() => {
					clearTimeout(timer);
					reject(new CancelledError());
				});
			}),
		cancelActiveListeners: () => {
			// no-op
		},
		player,
	});

	const addListener: PlayerStartListening = (options) => {
		const matches = (
			action: Action,
			currentState: PlayerState,
			previousState: PlayerState
		): boolean => {
			if (options.actionCreator) {
				return action.type === options.actionCreator.type;
			}
			if (options.type) {
				return action.type === options.type;
			}
			if (options.matcher) {
				return options.matcher(action);
			}
			if (options.predicate) {
				return options.predicate(action, currentState, previousState);
			}
			return false;
		};

		const listener: Listener = { matches, effect: options.effect };
		listeners.push(listener);

		return () => {
			const index = listeners.indexOf(listener);
			if (index !== -1) {
				listeners.splice(index, 1);
			}
		};
	};

	// Track one active CancelToken per listener registration
	const activeTokens = new Map<Listener, CancelToken>();

	const put = (action: Action) => {
		const previousState = state;
		state = rootReducer(state, action);

		// Notify take waiters
		for (let i = takeWaiters.length - 1; i >= 0; i--) {
			const waiter = takeWaiters[i];
			if (waiter.predicate(action)) {
				takeWaiters.splice(i, 1);
				waiter.resolve(action);
			}
		}

		// Run matching listeners
		const currentListeners = [...listeners];
		for (const listener of currentListeners) {
			if (listener.matches(action, state, previousState)) {
				const prevToken = activeTokens.get(listener);
				if (prevToken) {
					prevToken.cancel();
				}

				const token = createCancelToken();
				activeTokens.set(listener, token);

				const api = createApi(token);
				listener.effect(action, api).catch(() => {
					// ignore
				});
			}
		}
	};

	const runEffect = (
		effect: (api: PlayerListenerApi) => Promise<void>
	): CancellableTask => {
		const token = createCancelToken();

		const promise = new Promise<void>((resolve, reject) => {
			const api = createApi(token);

			effect(api)
				.then(resolve)
				.catch((err) => {
					if (err instanceof CancelledError) {
						resolve();
					} else {
						reject(err);
					}
				});
		});

		return {
			cancel: () => {
				token.cancel();
			},
			promise,
		};
	};

	const player: Player = {
		id,
		logger: dependencies.logger,
		board: dependencies.boards.board,
		bench: dependencies.boards.bench,
		gamemode: dependencies.gamemode,
		settings: dependencies.settings,
		name: initialVars.name,
		profile: initialVars.profile,
		finishPosition: initialVars.finishPosition,
		finishRound: initialVars.finishRound,
		match: initialVars.match,
		select: <T>(selector: (state: PlayerState) => T) => selector(state),
		put,
		addListener,
		runEffect,
	};

	setupPlayerListeners(player.addListener);

	return player;
};
