import * as React from "react";

import { createUseStyles } from "react-jss";

import { ReadyUpButton } from "./ReadyUpButton";
import { SellPieceButton } from "./SellPieceButton";

const useStyles = createUseStyles({
	controls: {
		display: "flex",
		justifyContent: "space-between",
		height: "100%",
	},
});

export function Controls() {
	const styles = useStyles();

	return (
		<div className={styles.controls}>
			<div style={{ width: "48%" }}>
				<ReadyUpButton />
			</div>
			<div style={{ width: "48%" }}>
				<SellPieceButton />
			</div>
		</div>
	);
}
