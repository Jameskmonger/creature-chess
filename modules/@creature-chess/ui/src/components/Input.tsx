import * as React from "react";

import classNames from "classnames";

import { createUseThemeStyles } from "../styles";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const useStyles = createUseThemeStyles((theme) => ({
	input: {
		"fontFamily": theme.typography.primary,
		"fontSize": "1.1rem",
		"color": theme.palette.light.neutral,
		"background": theme.palette.secondary.dark,
		"border": `2px solid ${theme.palette.secondary.light}`,
		"borderRadius": "4px",
		"padding": "0.4rem 0.6rem",
		"outline": "none",

		"&::placeholder": {
			color: "hsl(0deg 0% 100% / 0.4)",
		},

		"&:focus": {
			borderColor: theme.palette.accent.neutral,
		},
	},
}));

export const Input = React.forwardRef<HTMLInputElement, Props>(
	({ className, ...rest }, ref) => {
		const classes = useStyles();

		return (
			<input
				ref={ref}
				className={classNames(classes.input, className)}
				{...rest}
			/>
		);
	}
);
Input.displayName = "Input";
