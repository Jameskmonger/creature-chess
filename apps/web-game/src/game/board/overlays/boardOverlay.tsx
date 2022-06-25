import * as React from "react";
import { createUseStyles } from "react-jss";
import ReactModal from "react-modal";

const useStyles = createUseStyles({
	overlay: {
		"position": "absolute",
		"top": "0",
		"left": "0",
		"zIndex": "500",
		"display": "flex",
		"width": "100%",
		"height": "100%",
		"justifyContent": "space-around",
		"alignItems": "center",
		"inset": "0",
		"background": "rgba(0, 0, 0, 0.85)",
	},
	portal: {
		"position": "absolute",
		"top": "-0.5%",
		"left": "0",
		"zIndex": "510",
		"width": "100%",
		"height": "101%",
	},
	modal: {
		"position": "absolute",
		"display": "flex",
		"padding": "2em",
		"overflow": "auto",
		"fontFamily": "Arial, sans-serif",
		"color": "#fff",
		"background": "#333c57",
		"outline": "none",
	},
})

const BoardOverlay: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
	const styles = useStyles();
	const parentSelector = () => document.querySelector(".board-container") as HTMLElement;

	return (
		<ReactModal
			isOpen
			className={styles.modal}
			overlayClassName={styles.overlay}
			portalClassName={styles.portal}
			parentSelector={parentSelector}
		>
			{children}
		</ReactModal>
	);
};

export { BoardOverlay };
