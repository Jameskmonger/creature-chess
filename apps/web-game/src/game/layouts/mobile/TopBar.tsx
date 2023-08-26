import * as React from "react";

import { Layout } from "@cc-web/ui";
import { createUseStyles } from "react-jss";

import { PhaseInfo, RoundIndicator } from "../../module";

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
