import {
	Action,
	Dispatch,
	ReducersMapObject,
	UnknownAction,
	configureStore,
	createListenerMiddleware,
	ListenerEffectAPI,
	TypedStartListening,
} from "@reduxjs/toolkit";

import { CancellableTask } from "../effects";
import {
	createVariableStore,
	GetVariableFn,
	UpdateVariablesFn,
} from "./variablesStore";

export type EntityExtra<TDependencies, TVariables> = {
	id: string;
	dependencies: TDependencies;
	getVariable: GetVariableFn<TVariables>;
	updateVariables: UpdateVariablesFn<TVariables>;
};

export type EntityListenerApi<
	TState,
	TDependencies,
	TVariables,
> = ListenerEffectAPI<TState, Dispatch<UnknownAction>, EntityExtra<TDependencies, TVariables>>;

export type EntityStartListening<
	TState,
	TDependencies,
	TVariables,
> = TypedStartListening<TState, Dispatch<UnknownAction>, EntityExtra<TDependencies, TVariables>>;

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
	put: (action: Action) => void;
};

type EntityStaticProperties<TState, TDependencies, TVariables> = {
	reducers: ReducersMapObject<TState>;
	setupListeners?: (startListening: EntityStartListening<TState, TDependencies, TVariables>, extra: EntityExtra<TDependencies, TVariables>) => void;
};

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
	const variableStore = createVariableStore<TVariables>(initialVariables);

	const extra: EntityExtra<TDependencies, TVariables> = {
		id,
		dependencies,
		getVariable: variableStore.getVariable,
		updateVariables: variableStore.updateVariables,
	};

	const listenerMiddleware = createListenerMiddleware({ extra });

	const store = configureStore({
		reducer: reducers,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: false,
				serializableCheck: false,
			}).prepend(listenerMiddleware.middleware),
	});

	const typedStartListening = listenerMiddleware.startListening as EntityStartListening<TState, TDependencies, TVariables>;

	if (setupListeners) {
		setupListeners(typedStartListening, extra);
	}

	let effectCount = 0;

	const runEffect = (
		effect: (api: EntityListenerApi<TState, TDependencies, TVariables>) => Promise<void>
	): CancellableTask => {
		let cancelled = false;
		let unsubscribe: (() => void) | null = null;

		const promise = new Promise<void>((resolve, reject) => {
			const sentinelType = `__runEffect_${id}_${++effectCount}`;

			unsubscribe = listenerMiddleware.startListening({
				type: sentinelType,
				effect: async (_action, api) => {
					unsubscribe?.();
					unsubscribe = null;

					if (cancelled) {
						resolve();
						return;
					}

					try {
						await effect(api as EntityListenerApi<TState, TDependencies, TVariables>);
						resolve();
					} catch (err) {
						if (cancelled) {
							resolve();
						} else {
							reject(err);
						}
					}
				},
			});

			store.dispatch({ type: sentinelType });
		});

		return {
			cancel: () => {
				cancelled = true;
				// Remove the listener if the effect hasn't started yet
				unsubscribe?.();
				unsubscribe = null;
			},
			promise,
		};
	};

	return {
		id,
		dependencies,
		select: <T>(selector: (state: TState) => T) => selector(store.getState()),
		getVariable: variableStore.getVariable,
		updateVariables: variableStore.updateVariables,
		runEffect,
		addListener: typedStartListening,
		put: (action: Action) => store.dispatch(action),
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
