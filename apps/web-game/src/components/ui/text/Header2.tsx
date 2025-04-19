import * as React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	h2: {
		fontSize: "1.5em",
		fontWeight: "bolder",
		marginBottom: "0.5em",
	},
});

export function Header2({ children }: { children: React.ReactNode }) {
	const styles = useStyles();

	return <h2 className={styles.h2}>{children}</h2>;
}
