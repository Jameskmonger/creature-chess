import * as React from "react";

import { createUseStyles } from "react-jss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
	coinIcon: {
		color: "#ddc160",
	},
});

export function CoinIcon() {
	const styles = useStyles();

	return <FontAwesomeIcon
		icon={faCoins}
		className={styles.coinIcon}
	/>;
}
