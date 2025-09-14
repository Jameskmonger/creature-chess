import { createUseStyles } from "react-jss";

type Theme = {
	background: string;
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
