import * as React from "react";

import { createUseStyles } from "react-jss";

type Props = {
	type?: "default" | "highlight";
	children: React.ReactNode | React.ReactNode[];
};

const useStyles = createUseStyles({
	label: {
		fontSize: "0.8rem",
		fontWeight: 700,
		color: (props: Props) => (props.type === "highlight" ? "#ffcd75" : "#fff"),
	},
});

const Label: React.FunctionComponent<Props> = (props) => {
	const classes = useStyles(props);

	return <span className={classes.label}>{props.children}</span>;
};

export { Label };
