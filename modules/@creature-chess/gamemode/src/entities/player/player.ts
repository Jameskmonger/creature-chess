import { Logger } from "winston";

import { Board } from "@creature-chess/board";
import { GamemodeSettings } from "@creature-chess/models";
import { PlayerProfile } from "@creature-chess/models";

import type { Gamemode } from "../../game";
import type { Match } from "../../game/match";
import { roundInfoReducer } from "../../game/roundInfo";
import { PlayerState, playerReducers } from "./state";
import { setupPlayerListeners } from "./listeners/root";

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
	predicate?: (action: Action, currentState: PlayerState, previousState: PlayerState) => boolean;
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
	[K in keyof TState]: (state: TState[K] | undefined, action: Action) => TState[K];
};

type Listener = {
	matches: (action: Action, currentState: PlayerState, previousState: PlayerState) => boolean;
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

		return (changed || !state) ? nextState : state;
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

	const createApi = (signal: AbortSignal): PlayerListenerApi => ({
		getState: () => state,
		dispatch: (action: Action) => put(action),
		take: (predicate: (action: Action) => boolean) => new Promise<Action>((resolve, reject) => {
				if (signal.aborted) {
					reject(new CancelledError());
					return;
				}

				const onAbort = () => {
					removeTakeWaiter(waiter);
					reject(new CancelledError());
				};

				const waiter: TakeWaiter = {
					predicate,
					resolve: (action) => {
						signal.removeEventListener("abort", onAbort);
						resolve(action);
					},
					reject,
				};
				takeWaiters.push(waiter);

				signal.addEventListener("abort", onAbort, { once: true });
			}),
		delay: (ms: number) => new Promise<void>((resolve, reject) => {
				if (signal.aborted) {
					reject(new CancelledError());
					return;
				}

				const onAbort = () => {
					clearTimeout(timer);
					reject(new CancelledError());
				};

				const timer = setTimeout(() => {
					signal.removeEventListener("abort", onAbort);
					resolve();
				}, ms);

				signal.addEventListener("abort", onAbort, { once: true });
			}),
		cancelActiveListeners: () => {
			// no-op
		},
		player,
	});

	const addListener: PlayerStartListening = (options) => {
		const matches = (action: Action, currentState: PlayerState, previousState: PlayerState): boolean => {
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

	// Track one active AbortController per listener registration
	const activeControllers = new Map<Listener, AbortController>();

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
				const prevController = activeControllers.get(listener);
				if (prevController) {
					prevController.abort();
				}

				const controller = new AbortController();
				activeControllers.set(listener, controller);

				const api = createApi(controller.signal);
				listener.effect(action, api).catch(() => {
					// ignore
				});
			}
		}
	};

	const runEffect = (
		effect: (api: PlayerListenerApi) => Promise<void>
	): CancellableTask => {
		const controller = new AbortController();

		const promise = new Promise<void>((resolve, reject) => {
			const api = createApi(controller.signal);

			effect(api).then(resolve).catch((err) => {
				if (err instanceof CancelledError) {
					resolve();
				} else {
					reject(err);
				}
			});
		});

		return {
			cancel: () => {
 controller.abort();
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
