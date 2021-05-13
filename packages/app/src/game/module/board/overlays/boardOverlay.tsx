import * as React from "react";
import ReactModal from "react-modal";

const BoardOverlay: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
	const parentSelector = () => document.querySelector(".chessboard") as HTMLElement;

	return (
		<ReactModal
			isOpen
			className="modal"
			overlayClassName="modal-overlay"
			parentSelector={parentSelector}
		>
			{children}
		</ReactModal>
	);
};

export { BoardOverlay };
