import * as React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	h2: {
		"fontSize": "12px",
		"fontWeight": "bolder",
		"marginBottom": "0.25em",

		"@media (min-width: 400px)": {
			fontSize: "18px",
		},
	},
});

export function Header4({ children }: { children: React.ReactNode }) {
	const styles = useStyles();

	return <h4 className={styles.h2}>{children}</h4>;
}
