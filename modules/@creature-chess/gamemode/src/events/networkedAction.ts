export type NetworkedAction<T extends string, P = void> = {
	type: T;
	payload: P;
};

export type NetworkedActionFactory<T extends string, P = void> = ((
	payload: P
) => NetworkedAction<T, P>) & {
	type: T;
	toString(): T;
	match(action: { type: string }): action is NetworkedAction<T, P>;
};

export const networkedAction = <P = void, T extends string = string>(
	type: T
): NetworkedActionFactory<T, P> => {
	const factory = ((payload: P) => ({ type, payload })) as NetworkedActionFactory<
		T,
		P
	>;
	factory.type = type;
	factory.toString = () => type;
	factory.match = (a): a is NetworkedAction<T, P> => a.type === type;
	return factory;
};
