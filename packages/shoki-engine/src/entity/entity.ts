import createSagaMiddleware from "redux-saga";
import { createVariableStore, GetVariableFn, UpdateVariablesFn } from "./variablesStore";
import { applyMiddleware, combineReducers, createStore, ReducersMapObject } from "redux";
import { Saga, Task } from "../effects";

export type Entity<TState, TVariables> = {
	readonly id: string;
	select: <T>(selector: (state: TState) => T) => T;
	runSaga: <S extends Saga>(saga: S, ...args: Parameters<S>) => Task;
	getVariable: GetVariableFn<TVariables>;
}

type EntitySagaContext<TDependencies, TVariables> = {
	id: string,
	dependencies: TDependencies,
	getVariable: GetVariableFn<TVariables>,
	updateVariables: UpdateVariablesFn<TVariables>
}

type EntityStaticProperties<TState> = {
	reducers: ReducersMapObject<TState>,
	rootSaga?: Saga
}

export const entity = <TState, TDependencies = {}, TVariables extends {} = {}>(
	{ reducers, rootSaga }: EntityStaticProperties<TState>,
	dependencies: TDependencies,
	id: string,
	initialVariables: TVariables = {} as TVariables
): Entity<TState, TVariables> => {
	const variableStore = createVariableStore<TVariables>(initialVariables);

	const sagaMiddleware = createSagaMiddleware<EntitySagaContext<TDependencies, TVariables>>({
		context: {
			id,
			dependencies,
			getVariable: variableStore.getVariable,
			updateVariables: variableStore.updateVariables
		}
	});

	const store = createStore(
		combineReducers<TState>(reducers),
		applyMiddleware(sagaMiddleware)
	);

	if (rootSaga) {
		sagaMiddleware.run(rootSaga);
	}

	return {
		id,
		select: <T>(selector: (state: TState) => T) => selector(store.getState()),
		getVariable: variableStore.getVariable,
		runSaga: sagaMiddleware.run
	}
};

export const entityFactory = <TState, TDependencies, TVariables>(
	statics: (EntityStaticProperties<TState> | ((dependencies: TDependencies) => EntityStaticProperties<TState>))
) => {
	return (
		dependencies: TDependencies,
		id: string,
		initialVariables: TVariables
	) => {
		if (typeof statics === "function") {
			return entity(statics(dependencies), dependencies, id, initialVariables)
		}

		return entity(statics, dependencies, id, initialVariables);
	};
};
