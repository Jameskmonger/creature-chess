import * as React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	chip: {
		"fontFamily": "Arial, sans-serif",
		"fontSize": "1.2em",
		"color": "#fff",
		"textAlign": "center",
		"textTransform": "uppercase",
	}
});


export function InfoChip({ children }: { children: React.ReactNode }) {
	const styles = useStyles();

	return (
		<div className={styles.chip}>
			{children}
		</div>
	);
};
