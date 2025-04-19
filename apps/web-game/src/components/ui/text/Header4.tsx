import * as React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	h2: {
		fontSize: "1em",
		fontWeight: "bolder",
		marginBottom: "0.25em",
	},
});

export function Header4({ children }: { children: React.ReactNode }) {
	const styles = useStyles();

	return <h4 className={styles.h2}>{children}</h4>;
}
