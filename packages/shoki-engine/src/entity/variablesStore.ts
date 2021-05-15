import { getContext } from "typed-redux-saga";
import { GetContextEffect } from "../effects";

export type GetVariableFn<TVariables> = <TResult>(selector: (variables: TVariables) => TResult) => TResult;
export type UpdateVariablesFn<TVariables> = (patch: Partial<TVariables>) => void;

/**
 * @param getVariable - Select a variable from the variable store
 * @param updateVariables - Update a/some variable(s) in the variable store
 */
export type VariablesStoreContext<TVariables> = {
	getVariable: GetVariableFn<TVariables>;
	updateVariables: UpdateVariablesFn<TVariables>;
};

/**
 * Select a variable from the variable store
 *
 * Accessor for `getVariable` in the {@link VariablesStoreContext}
 *
 * @typeParam TVariables - The type of the variables object
 * @typeParam TResult - The return type of the selector
 *
 * @param selector - The selector function
 * @returns The selected variable from the variable store
 */
export const getVariable: <TVariables, TResult>(selector: (variables: TVariables) => TResult) => Generator<GetContextEffect, TResult>
	= function*<TVariables, TResult>(selector: (variables: TVariables) => TResult) {
		const getVariable = yield* getContext<GetVariableFn<TVariables>>("getVariable");

		return getVariable(selector);
	};

/**
 * Update a/some variable(s) in the variable store
 *
 * Accessor for `updateVariables` in the {@link VariablesStoreContext}
 *
 * @typeParam TVariables - The type of the variables object
 *
 * @param patch - The variables to update
 */
export const updateVariables: <TVariables>(patch: Partial<TVariables>) => Generator<GetContextEffect, void>
	= function*<TVariables>(patch: Partial<TVariables>) {
		const updateVariables = yield* getContext<UpdateVariablesFn<TVariables>>("updateVariables");

		return updateVariables(patch);
	};

/**
 * Create a variable store.
 *
 * @typeParam TVariables - The type of the variables object
 *
 * @param defaultVariables - The default set of variables for the store
 *
 * @returns A variable store context {@link VariablesStoreContext}
 */
export const createVariableStore = <TVariables>(defaultVariables: TVariables): VariablesStoreContext<TVariables> => {
	let state: TVariables = defaultVariables;

	return {
		getVariable: selector => selector(state),
		updateVariables: patch => {
			state = {
				...state,
				...patch
			};
		}
	};
};
