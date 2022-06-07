import * as React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	contentPane: {
		"flex": "1",
		"display": "flex",
		"flexDirection": "column",
		"overflowY": "hidden",
		"justifyDontent": "space-between",
	}
})

export function MobileContentPane({ children }: { children: React.ReactNode }) {
	const styles = useStyles();

	return <div className={styles.contentPane}>{children}</div>;
}
