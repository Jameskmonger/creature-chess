import * as React from "react";

import { createUseStyles } from "react-jss";

import { ReadyUpButton } from "./ReadyUpButton";
import { SellPieceButton } from "./SellPieceButton";

const useStyles = createUseStyles({
	controls: {
		display: "flex",
		justifyContent: "space-between",
	},
});

export function Controls() {
	const styles = useStyles();

	return (
		<div className={styles.controls}>
			<ReadyUpButton />
			<SellPieceButton />
		</div>
	);
}
