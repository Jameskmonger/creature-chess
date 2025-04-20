import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { ReadyUpButton } from "./ReadyUpButton";
import { SellPieceButton } from "./SellPieceButton";

type Props = {
	className?: string;
};

const useStyles = createUseStyles({
	controls: {
		display: "flex",
		justifyContent: "space-between",
		height: "100%",
		gap: "16px",
	},
	control: {
		flex: 1,
	},
});

export function Controls({ className }: Props) {
	const styles = useStyles();

	return (
		<div className={classNames(styles.controls, className)}>
			<div className={styles.control}>
				<ReadyUpButton />
			</div>
			<div className={styles.control}>
				<SellPieceButton />
			</div>
		</div>
	);
}
