export type GetVariableFn<TVariables> = <TResult>(
	selector: (variables: TVariables) => TResult
) => TResult;
export type UpdateVariablesFn<TVariables> = (
	patch: Partial<TVariables>
) => void;

/**
 * @param getVariable - Select a variable from the variable store
 * @param updateVariables - Update a/some variable(s) in the variable store
 */
export type VariablesStoreContext<TVariables> = {
	getVariable: GetVariableFn<TVariables>;
	updateVariables: UpdateVariablesFn<TVariables>;
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
export const createVariableStore = <TVariables>(
	defaultVariables: TVariables
): VariablesStoreContext<TVariables> => {
	let state: TVariables = defaultVariables;

	return {
		getVariable: (selector) => selector(state),
		updateVariables: (patch) => {
			state = {
				...state,
				...patch,
			};
		},
	};
};
