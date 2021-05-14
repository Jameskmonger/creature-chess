import { getContext } from "typed-redux-saga";

type GetPlayerVariableFn<TVariables> = <TResult>(selector: (variables: TVariables) => TResult) => TResult;
type UpdatePlayerVariablesFn<TVariables> = (patch: Partial<TVariables>) => void;

/**
 * @param getVariable - Select a variable from the player variable store
 * @param updateVariables - Update a/some variable(s) in the player variable store
 */
export type PlayerVariablesStoreContext<TVariables> = {
	getVariable: GetPlayerVariableFn<TVariables>;
	updateVariables: UpdatePlayerVariablesFn<TVariables>;
};

/**
 * Select a variable from the player variable store
 *
 * Accessor for `getVariable` in the {@link PlayerVariablesStoreContext}
 *
 * @typeParam TVariables - The type of the player variables object
 * @typeParam TResult - The return type of the selector
 *
 * @param selector - The selector function
 * @returns The selected variable from the variable store
 */
export const getPlayerVariable = function*<TVariables, TResult>(selector: (variables: TVariables) => TResult) {
	const getVariable = yield* getContext<GetPlayerVariableFn<TVariables>>("getVariable");

	return getVariable(selector);
};

/**
 * Update a/some variable(s) in the player variable store
 *
 * Accessor for `updateVariables` in the {@link PlayerVariablesStoreContext}
 *
 * @typeParam TVariables - The type of the player variables object
 *
 * @param patch - The variables to update
 */
export const updatePlayerVariables = function*<TVariables>(patch: Partial<TVariables>) {
	const updateVariables = yield* getContext<UpdatePlayerVariablesFn<TVariables>>("updateVariables");

	return updateVariables(patch);
};

/**
 * Create a player variable store.
 *
 * @typeParam TVariables - The type of the player variables object
 *
 * @param defaultVariables - The default set of variables for the store
 *
 * @returns A variable store context {@link PlayerVariablesStoreContext}
 */
export const createPlayerVariableStore = <TVariables>(defaultVariables: TVariables): PlayerVariablesStoreContext<TVariables> => {
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
