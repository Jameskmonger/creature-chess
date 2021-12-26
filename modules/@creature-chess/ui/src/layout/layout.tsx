import * as React from "react";
import { createUseStyles, ThemeProvider } from "react-jss";
import { Property } from "csstype";
import classNames from "classnames";
import { LayoutTheme } from "./theme";

type FlexDirection = "column" | "column-reverse" | "row" | "row-reverse";

type Props = {
	className?: string;
	children: React.ReactNode | React.ReactNode[];
	justifyContent?: Property.JustifyContent;
	direction: FlexDirection;
	noSpacer?: boolean;
	grow?: boolean;
};

const isVertical = (direction: Property.FlexDirection) => direction === "column" || direction === "column-reverse";
const getSpacer = (noSpacer: boolean) => noSpacer ? {} : { padding: "0.25em" }
const getSize = (grow: boolean) => grow ? { width: "100%", height: "100%" } : {};

const useStyles = createUseStyles({
	layout: ({
		direction,
		justifyContent = "space-between",
		noSpacer = false,
		grow = false
	}: Props) => ({
		display: "flex",
		justifyContent,
		flexDirection: direction,
		...getSize(grow),
		...getSpacer(noSpacer)
	})
});

const Layout: React.FunctionComponent<Props> = (props) => {
	const classes = useStyles(props);

	const theme: LayoutTheme = { isVertical: isVertical(props.direction) };

	return (
		<div className={classNames(classes.layout, props.className)}>
			<ThemeProvider theme={theme}>
				{props.children}
			</ThemeProvider>
		</div>
	);
};

export { Layout };
