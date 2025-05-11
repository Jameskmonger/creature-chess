import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { AppState } from "~/store";

const useStyles = createUseStyles({
	debugBar: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "end",
		alignItems: "center",
		fontSize: "12px",
		background: "rgba(0, 0, 0, 0.5)",
		padding: "4px 8px",
	},
	ping: {
		color: "#fff",
	},
});

export function DebugBar() {
	const styles = useStyles();
	const network = useSelector<AppState, AppState["game"]["network"]>(
		(state) => state.game.network
	);

	const [timeoutState, setTimeoutState] = React.useState(false);

	React.useEffect(() => {
		const interval = setInterval(() => {
			const timeSinceLast = Date.now() - network.lastPingTimestamp;

			if (timeSinceLast > 5000) {
				setTimeoutState(true);
			} else {
				setTimeoutState(false);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [network.lastPingTimestamp]);

	return (
		<div className={styles.debugBar}>
			<span className={styles.ping}>
				{timeoutState ? "XXX" : `${network.pingMs}ms`}
			</span>
		</div>
	);
}
