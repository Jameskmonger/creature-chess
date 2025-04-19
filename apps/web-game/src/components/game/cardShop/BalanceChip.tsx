import React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	container: {
		height: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	balance: {
		padding: "0.5em 1em",
		borderRadius: "4px",
		background: "rgb(48, 48, 48)",
		fontWeight: 700,
		fontFamily: "Arial, sans-serif",
		textTransform: "uppercase",
		fontSize: "0.75em",
		color: "#fff",
	},
	highlight: {
		color: "rgb(255, 205, 117)",
		fontSize: "1.25em",
		marginLeft: "1em",
	},
});

export function BalanceChip({ balance }: { balance: number }) {
	const styles = useStyles();

	return (
		<div className={styles.container}>
			<span className={styles.balance}>
				Balance <span className={styles.highlight}>${balance}</span>
			</span>
		</div>
	);
}
