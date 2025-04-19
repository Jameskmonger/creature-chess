import * as React from "react";

import { useDispatch } from "react-redux";

import { closeOverlay } from "../../../../store/game/ui";
import { useStyles } from "./OverlayComponent.styles";

export function OverlayComponent({
	title,
	children,
	fullscreen = false,
}: {
	title: string | React.ReactNode;
	children: React.ReactNode;
	fullscreen?: boolean;
}) {
	const styles = useStyles();
	const dispatch = useDispatch();
	const dispatchCloseOverlay = () => dispatch(closeOverlay());

	return (
		<div className={styles.overlay}>
			<div className={styles.header}>
				{typeof title === "string" ? (
					<h2>{title}</h2>
				) : (
					<div className={styles.titleChild}>{title}</div>
				)}
				<button className={styles.closeButton} onClick={dispatchCloseOverlay}>
					X
				</button>
			</div>
			<div
				className={
					fullscreen ? styles.overlayContentFullscreen : styles.overlayContent
				}
			>
				{children}
			</div>
		</div>
	);
}
