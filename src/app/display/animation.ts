import { assign, keys } from "lodash";

export interface Animation {
    name: string;
    variables?: AnimationVariables;
}

export interface AnimationVariables {
    [key: string]: string | number;
}

export const getAnimationCssVariables = (animations: Animation[]) => {
    const variables = assign({}, ...animations.filter(a => a.variables).map(a => a.variables));
    return assign({}, ...keys(variables).map(key => ({ [`--${key}`]: variables[key] })));
};
