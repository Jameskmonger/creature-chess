import * as React from "react";
import { useDispatch } from "react-redux";
import { closeOverlay } from "../../ui";
import { useStyles } from "./OverlayComponent.styles";

export function OverlayComponent({ title, children, fullscreen = false }: {
	title: string,
	children: React.ReactNode,
	fullscreen?: boolean
}) {
	const styles = useStyles();
	const dispatch = useDispatch();
	const dispatchCloseOverlay = () => dispatch(closeOverlay());

	return (
		<div className={styles.overlay}>
			<div className={styles.header}>
				<h2>{title}</h2>
				<button className={styles.closeButton} onClick={dispatchCloseOverlay}>X</button>
			</div>
			<div className={fullscreen ? styles.overlayContentFullscreen : styles.overlayContent}>
				{children}
			</div>
		</div>
	);
};
