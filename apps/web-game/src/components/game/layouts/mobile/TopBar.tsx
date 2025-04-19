import * as React from "react";

import { createUseStyles } from "react-jss";

import { Layout } from "../../../ui/layout";
import { PhaseInfo } from "../../phaseInfo";
import { RoundIndicator } from "../../roundIndicator";

const useStyles = createUseStyles({
	topBar: {
		background: "#1d1d1d",
	},
});

export function TopBar() {
	const styles = useStyles();

	return (
		<Layout className={styles.topBar} direction="row">
			<RoundIndicator />

			<PhaseInfo />
		</Layout>
	);
}
