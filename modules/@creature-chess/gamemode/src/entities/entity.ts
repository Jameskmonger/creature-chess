type ReducersMapObject<TState> = {
	[K in keyof TState]: (state: TState[K] | undefined, action: { type: string; payload?: any }) => TState[K];
};

export type CancellableTask = {
	cancel(): void;
	promise: Promise<void>;
};

type Action = { type: string; payload?: any };

type ActionCreatorWithType = ((...args: any[]) => Action) & { type: string; toString(): string; match(action: any): boolean };

type GetVariableFn<TVariables> = <TResult>(
	selector: (variables: TVariables) => TResult
) => TResult;

type UpdateVariablesFn<TVariables> = (
	patch: Partial<TVariables>
) => void;

export type EntityExtra<TDependencies, TVariables> = {
	id: string;
	dependencies: TDependencies;
	getVariable: GetVariableFn<TVariables>;
	updateVariables: UpdateVariablesFn<TVariables>;
};

export type EntityListenerApi<TState, TDependencies, TVariables> = {
	getState: () => TState;
	dispatch: (action: Action) => void;
	take: (predicate: (action: Action) => boolean) => Promise<Action>;
	delay: (ms: number) => Promise<void>;
	cancelActiveListeners: () => void;
	extra: EntityExtra<TDependencies, TVariables>;
};

type ListenerOptions<TState, TDependencies, TVariables> = {
	actionCreator?: ActionCreatorWithType;
	type?: string;
	predicate?: (action: Action, currentState: TState, previousState: TState) => boolean;
	matcher?: (action: any) => boolean;
	effect: (action: any, api: EntityListenerApi<TState, TDependencies, TVariables>) => Promise<void>;
};

export type EntityStartListening<TState, TDependencies, TVariables> =
	(options: ListenerOptions<TState, TDependencies, TVariables>) => () => void;

export type Entity<TState, TDependencies, TVariables> = {
	readonly id: string;
	readonly dependencies: TDependencies;
	select: <T>(selector: (state: TState) => T) => T;
	runEffect: (
		effect: (api: EntityListenerApi<TState, TDependencies, TVariables>) => Promise<void>
	) => CancellableTask;
	addListener: EntityStartListening<TState, TDependencies, TVariables>;
	getVariable: GetVariableFn<TVariables>;
	updateVariables: UpdateVariablesFn<TVariables>;
	put: (action: { type: string; payload?: any }) => void;
};

type Listener<TState, TDependencies, TVariables> = {
	matches: (action: Action, currentState: TState, previousState: TState) => boolean;
	effect: (action: any, api: EntityListenerApi<TState, TDependencies, TVariables>) => Promise<void>;
};

type EntityStaticProperties<TState, TDependencies, TVariables> = {
	reducers: ReducersMapObject<TState>;
	setupListeners?: (startListening: EntityStartListening<TState, TDependencies, TVariables>, extra: EntityExtra<TDependencies, TVariables>) => void;
};

type TakeWaiter = {
	predicate: (action: Action) => boolean;
	resolve: (action: Action) => void;
	reject: (err: Error) => void;
};

class CancelledError extends Error {
	constructor() { super("cancelled"); }
}

/**
 * Combine a ReducersMapObject into a single reducer function
 * that works on plain state (no Redux store needed).
 */
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

export const entity = <
	TState,
	TDependencies extends {} = {},
	TVariables extends {} = {},
>(
	{ reducers, setupListeners }: EntityStaticProperties<TState, TDependencies, TVariables>,
	id: string,
	dependencies: TDependencies = {} as TDependencies,
	initialVariables: TVariables = {} as TVariables
): Entity<TState, TDependencies, TVariables> => {
	// Variables store
	let variables: TVariables = initialVariables;
	const getVariable: GetVariableFn<TVariables> = (selector) => selector(variables);
	const updateVariables: UpdateVariablesFn<TVariables> = (patch) => {
		variables = { ...variables, ...patch };
	};

	const extra: EntityExtra<TDependencies, TVariables> = {
		id,
		dependencies,
		getVariable,
		updateVariables,
	};

	// Initialize state by running reducers with undefined state and an init action
	const rootReducer = combineReducersPlain(reducers);
	let state: TState = rootReducer(undefined, { type: "@@INIT" });

	// Listener registry
	const listeners: Listener<TState, TDependencies, TVariables>[] = [];

	// Take waiters - functions waiting for specific actions
	const takeWaiters: TakeWaiter[] = [];

	const removeTakeWaiter = (waiter: TakeWaiter) => {
		const i = takeWaiters.indexOf(waiter);
		if (i !== -1) takeWaiters.splice(i, 1);
	};

	/**
	 * Create a listener API for an effect, tied to an AbortSignal for cancellation.
	 */
	const createApi = (signal: AbortSignal): EntityListenerApi<TState, TDependencies, TVariables> => ({
		getState: () => state,
		dispatch: (action: Action) => put(action),
		take: (predicate: (action: Action) => boolean) => {
			return new Promise<Action>((resolve, reject) => {
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
			});
		},
		delay: (ms: number) => {
			return new Promise<void>((resolve, reject) => {
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
			});
		},
		cancelActiveListeners: () => {
			// In the typical pattern, previous instances are already cancelled
			// when a new dispatch triggers the same listener (see put() below).
			// This is kept as a no-op for API compatibility.
		},
		extra,
	});

	const addListener: EntityStartListening<TState, TDependencies, TVariables> = (options) => {
		const matches = (action: Action, currentState: TState, previousState: TState): boolean => {
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

		const listener: Listener<TState, TDependencies, TVariables> = {
			matches,
			effect: options.effect,
		};

		listeners.push(listener);

		// Return unsubscribe function
		return () => {
			const index = listeners.indexOf(listener);
			if (index !== -1) {
				listeners.splice(index, 1);
			}
		};
	};

	// Track one active AbortController per listener registration.
	// When a new dispatch triggers the same listener, the previous instance is aborted.
	const activeControllers = new Map<Listener<any, any, any>, AbortController>();

	const put = (action: Action) => {
		// 1. Capture previous state, then update through reducers
		const previousState = state;
		state = rootReducer(state, action);

		// 2. Notify take waiters
		for (let i = takeWaiters.length - 1; i >= 0; i--) {
			const waiter = takeWaiters[i];
			if (waiter.predicate(action)) {
				takeWaiters.splice(i, 1);
				waiter.resolve(action);
			}
		}

		// 3. Run matching listeners
		// Snapshot to avoid issues with listeners added/removed during iteration
		const currentListeners = [...listeners];
		for (const listener of currentListeners) {
			if (listener.matches(action, state, previousState)) {
				// Cancel previous active instance of this listener
				const prevController = activeControllers.get(listener);
				if (prevController) {
					prevController.abort();
				}

				const controller = new AbortController();
				activeControllers.set(listener, controller);

				const api = createApi(controller.signal);

				listener.effect(action, api).catch(() => {
					// Swallow errors (including CancelledError) from listener effects
				});
			}
		}
	};

	const runEffect = (
		effect: (api: EntityListenerApi<TState, TDependencies, TVariables>) => Promise<void>
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

	// Set up listeners if provided
	if (setupListeners) {
		setupListeners(addListener, extra);
	}

	return {
		id,
		dependencies,
		select: <T>(selector: (state: TState) => T) => selector(state),
		getVariable,
		updateVariables,
		runEffect,
		addListener,
		put,
	};
};

export const entityFactory =
	<TState, TDependencies extends {} = {}, TVariables extends {} = {}>(
		statics:
			| EntityStaticProperties<TState, TDependencies, TVariables>
			| ((dependencies: TDependencies) => EntityStaticProperties<TState, TDependencies, TVariables>)
	) =>
		(
			id: string,
			dependencies: TDependencies = {} as TDependencies,
			initialVariables: TVariables = {} as TVariables
		) => {
			if (typeof statics === "function") {
				return entity(statics(dependencies), id, dependencies, initialVariables);
			}

			return entity(statics, id, dependencies, initialVariables);
		};
