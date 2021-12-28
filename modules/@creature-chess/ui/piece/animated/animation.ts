import { CSSProperties } from "react";

export type Animation = {
	name: string;
	keyframesName?: string;
	variables?: AnimationVariables;
};

export type AnimationVariables = {
	[key: string]: string | number;
};

export const getAnimationCssVariables = (animations: Animation[]): CSSProperties => {
	const variables = Object.assign({}, ...animations.filter(a => a.variables).map(a => a.variables));
	return Object.assign({}, ...Object.keys(variables).map(key => ({ [`--${key}`]: variables[key] })));
};
