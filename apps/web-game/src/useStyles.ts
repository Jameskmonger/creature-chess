import type { StyleSheetFactoryOptions } from "jss";
import { Styles, Theming, createUseStyles } from "react-jss";

type Theme = {
	background: string;
};

/**
 * This type isn't exported from react-jss, but we
 * need it to create our own useStyles hook.
 */
interface CreateUseStylesOptions extends StyleSheetFactoryOptions {
	index?: number;
	theming?: Theming<Theme>;
	name?: string;
}

export function createUseThemeStyles<
	C extends string = string,
	Props = unknown,
>(
	styles:
		| Styles<C, Props, Theme>
		| ((theme: Theme) => Styles<C, Props, undefined>),
	options?: CreateUseStylesOptions
) {
	return createUseStyles<C, Props, Theme>(styles, options);
}
