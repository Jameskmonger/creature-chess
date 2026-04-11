import * as React from "react";

import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	coinIcon: {
		color: "#ddc160",
	},
});

export function CoinIcon() {
	const styles = useStyles();

	return <FontAwesomeIcon icon={faCoins} className={styles.coinIcon} />;
}
