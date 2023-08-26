import * as React from "react";

import { createUseStyles } from "react-jss";

import { Layout } from "@cc-web/ui";

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
