import * as React from "react";

import { PhaseInfo, RoundIndicator } from "../../module";

import { useStyles } from "./TopBar.styles";

export function TopBar() {
	const styles = useStyles();

	return (
		<div className={styles.topBar}>
			<RoundIndicator />

			<PhaseInfo />
		</div>
	);
};
