import { createUseStyles } from "react-jss";

type Theme = {
	typography: {
		primary: string;
		accent: string;
	};
};

export const DEFAULT_THEME: Theme = {
	typography: {
		primary: "'Roboto', sans-serif",
		accent: "'Caveat Brush', cursive",
	},
};

export function createUseThemeStyles<
	C extends string = string,
	Props = unknown,
>(
	styles: Parameters<typeof createUseStyles<C, Props, Theme>>[0],
	options?: Parameters<typeof createUseStyles<C, Props, Theme>>[1]
) {
	return createUseStyles<C, Props, Theme>(styles, options);
}
